import { decodeSuiPrivateKey } from '@mysten/sui.js/cryptography'
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519'
import Base64 from 'crypto-js/enc-base64'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import sha256 from 'crypto-js/sha256'
import { TJoinedPlayer, TZkAccount } from '../types/global'
import { getZkAccounts } from './local-storage'

interface IOption {
  id: string
  text: string
  isCorrect: boolean
  image: string
}

interface IQues {
  createdAt: string | null
  updatedAt: string | null
  createdBy: string | null
  updatedBy: string | null
  deletedAt: string | null
  id: string
  question: string
  image: string | null
  time: number
  point: number
  options: IOption[]
}

export const createChecksum = (rawData: IQues[]) => {
  const account: TZkAccount[] = getZkAccounts()
  if (account.length > 0) {
    const hashDigest = sha256(JSON.stringify(rawData))
    const checksum = Base64.stringify(hmacSHA512(hashDigest, account[0].sub))
    return checksum
  }
}

export const createHashId = (id: string) => {
  const account: TZkAccount[] = getZkAccounts()
  if (account.length > 0) {
    const hashDigest = sha256(JSON.stringify(id))
    const checksum = Base64.stringify(hmacSHA512(hashDigest, account[0].sub))
    return checksum
  }
}

// Create a keypair from a base64-encoded secret key
export function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
  const keyPair = decodeSuiPrivateKey(privateKeyBase64)
  const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(keyPair.secretKey)
  return ephemeralKeyPair
}

export const handleSetNewPlayerList = (dataList: TJoinedPlayer[], newPlayer: TJoinedPlayer): TJoinedPlayer[] => {
  if (!dataList.length) {
    return [newPlayer]
  }

  const isExist = dataList.some((item) => item.playerId === newPlayer.playerId)
  if (!isExist) {
    return [...dataList, newPlayer]
  }

  const newList = dataList.map((item) => {
    if (item.playerId === newPlayer.playerId) {
      return newPlayer
    }

    return item
  })
  return newList
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
