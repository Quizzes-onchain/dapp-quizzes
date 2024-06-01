import { AUTH } from '@/src/constant/endpoint.constant'
import { MAX_EPOCH } from '@/src/constant/global.constant'
import { TProviderZK, TZkAccount, TZkProofInput, TGetSaltPayload, TSignInPayload } from '@/src/types/global'
import { keypairFromSecretKey } from '@/src/utils/lib'
import { clearZkSetup, getZkSetup, setAccessToken, setZkAccount, setZkSetup } from '@/src/utils/local-storage'
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519'
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  jwtToAddress,
} from '@mysten/zklogin'
import { jwtDecode } from 'jwt-decode'
import { MutableRefObject } from 'react'
import axiosClient from './axiosClient'
import suiClient from './suiClient'

const URL_PROVER = process.env.NEXT_PUBLIC_ZK_PROVER_ENDPOINT as string

export const authServices = {
  zkProof: (payload: TZkProofInput) => {
    return axiosClient.post(URL_PROVER, payload)
  },
  getSalt: (payload: TGetSaltPayload) => {
    return axiosClient.post(AUTH + '/salt', payload)
  },
  signIn: (payload: TSignInPayload) => {
    return axiosClient.post(AUTH + '/sign-in', payload)
  },
  beginZkLogin: async (provider: TProviderZK) => {
    // Create a nonce
    const { epoch } = await suiClient.getLatestSuiSystemState()
    const maxEpoch = Number(epoch) + MAX_EPOCH // the ephemeral key will be valid for MAX_EPOCH from now
    const ephemeralKeyPair = new Ed25519Keypair()
    const randomness = generateRandomness()
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness)

    // Save data to session storage so completeZkLogin() can use it after the redirect
    setZkSetup({
      provider,
      maxEpoch,
      randomness: randomness.toString(),
      ephemeralPrivateKey: ephemeralKeyPair.getSecretKey(),
    })

    // Start the OAuth flow with the OpenID provider
    const urlParamsBase = {
      nonce: nonce,
      redirect_uri: window.location.origin,
      response_type: 'id_token',
      scope: 'openid',
    }
    let loginUrl: string
    switch (provider) {
      case 'Google': {
        const urlParams = new URLSearchParams({
          ...urlParamsBase,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE as string,
        })
        loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams.toString()}`
        break
      }
      case 'Twitch': {
        const urlParams = new URLSearchParams({
          ...urlParamsBase,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID_TWITCH as string,
          force_verify: 'true',
          lang: 'en',
          login_type: 'login',
        })
        loginUrl = `https://id.twitch.tv/oauth2/authorize?${urlParams.toString()}`
        break
      }
      case 'Facebook': {
        const urlParams = new URLSearchParams({
          ...urlParamsBase,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID_FACEBOOK as string,
        })
        loginUrl = `https://www.facebook.com/v19.0/dialog/oauth?${urlParams.toString()}`
        break
      }
    }
    window.location.replace(loginUrl)
  },
  completeZkLogin: async (accounts: MutableRefObject<TZkAccount[]>) => {
    // Grab and decode the JWT that beginZkLogin() produced

    // grab the JWT from the URL fragment (the '#...')
    const urlFragment = window.location.hash.substring(1)
    const urlParams = new URLSearchParams(urlFragment)
    const jwt = urlParams.get('id_token')
    if (!jwt) {
      return
    }

    // remove the URL fragment
    window.history.replaceState(null, '', window.location.pathname)

    // decode the JWT
    const jwtPayload = jwtDecode(jwt)
    if (!jwtPayload.sub || !jwtPayload.aud) {
      console.warn('[completeZkLogin] missing jwt.sub or jwt.aud')
      return
    }

    //  Get the salt
    const saltResponse = await authServices.getSalt({ sub: jwtPayload.sub })

    if (!saltResponse) {
      return
    }

    const userSalt = BigInt(saltResponse.data.data.salt)

    // Get a Sui address for the user
    const userAddr = jwtToAddress(jwt, userSalt)

    // Load and clear the data which beginZkLogin() created before the redirect
    const setupData = getZkSetup()
    if (!setupData) {
      console.warn('[completeZkLogin] missing session storage data')
      return
    }
    clearZkSetup()
    for (const account of accounts.current) {
      if (userAddr === account.userAddr) {
        console.warn(`[completeZkLogin] already logged in with this ${setupData.provider} account`)
        return
      }
    }

    // Call API sign in anđ save accessToken to localStorage
    const signInResponse = await authServices.signIn({
      publicAddress: userAddr,
      sub: jwtPayload.sub,
      salt: String(userSalt),
    })

    setAccessToken(signInResponse.data.data.accessToken)

    // Get the zero-knowledge proof
    const ephemeralKeyPair = keypairFromSecretKey(setupData.ephemeralPrivateKey)
    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey()
    const payload = JSON.stringify(
      {
        maxEpoch: setupData.maxEpoch,
        jwtRandomness: setupData.randomness,
        extendedEphemeralPublicKey: getExtendedEphemeralPublicKey(ephemeralPublicKey),
        jwt,
        salt: userSalt.toString(),
        keyClaimName: 'sub',
      },
      null,
      2
    )

    console.debug('[completeZkLogin] Requesting ZK proof with:', payload)

    const urlProver = process.env.NEXT_PUBLIC_ZK_PROVER_ENDPOINT as string | URL | Request

    const zkProofs = await fetch(urlProver, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })
      .then((res) => {
        console.debug('[completeZkLogin] ZK proving service success')
        return res.json()
      })
      .catch((error: unknown) => {
        console.warn('[completeZkLogin] ZK proving service error:', error)
        return null
      })

    if (!zkProofs) {
      return
    }

    // Generate an address seed by combining userSalt, sub (subject ID), and aud (audience)
    const addressSeed = genAddressSeed(
      BigInt(userSalt),
      'sub',
      jwtPayload.sub,
      typeof jwtPayload.aud === 'string' ? jwtPayload.aud : jwtPayload.aud[0]
    ).toString()

    // Save data to session storage so sendTransaction() can use it
    setZkAccount({
      provider: setupData.provider,
      userAddr,
      zkLoginInput: { ...zkProofs, addressSeed },
      ephemeralPrivateKey: setupData.ephemeralPrivateKey,
      userSalt: userSalt.toString(),
      sub: jwtPayload.sub,
      aud: typeof jwtPayload.aud === 'string' ? jwtPayload.aud : jwtPayload.aud[0],
      maxEpoch: setupData.maxEpoch,
    })

    return 1
  },
}
