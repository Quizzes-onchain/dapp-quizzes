import { GAME, PLAYER } from '@/src/constant/endpoint.constant'
import axiosClient from './axiosClient'
import { TScoreBoardItemSocket } from '@/src/types/global'
import { getZkAccounts } from '@/src/utils/local-storage'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { CONTRACT_METHOD, CONTRACT_MODULE } from '@/src/constant/contract.constant'
import { keypairFromSecretKey } from '@/src/utils/lib'
import suiClient from './suiClient'
import { SerializedSignature } from '@mysten/sui.js/cryptography'
import { getZkLoginSignature } from '@mysten/zklogin'

type TJoinGame = {
  name: string
  pin: string
}

export const gameServices = {
  createGame: async (quizId: string) => {
    return axiosClient.post('/' + GAME + '/init', { quizId })
  },
  startGame: async (gameId: string) => {
    return axiosClient.post(`/${GAME}/${gameId}/start`)
  },
  joinGame: async (params: TJoinGame) => {
    return axiosClient.post(`${PLAYER}`, params)
  },
  submitScoreBoard: async (scoreBoard: TScoreBoardItemSocket[], objectId: string) => {
    const account = getZkAccounts()
    if (account.length > 0) {
      const txb = new TransactionBlock()
      const sender = account[0]
      txb.setSender(sender.userAddr)

      const users = scoreBoard.map((item) => {
        return item.publicAddress
      })

      const scores = scoreBoard.map((item) => {
        return BigInt(item.score)
      })

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      const contractModule = CONTRACT_MODULE
      const contractMethod = CONTRACT_METHOD.CREATE_GAME
      txb.moveCall({
        target: `${contractAddress}::${contractModule}::${contractMethod}`,
        arguments: [txb.pure(users), txb.pure(scores), txb.pure(objectId)],
      })
      const ephemeralKeyPair = keypairFromSecretKey(sender.ephemeralPrivateKey)
      const { bytes, signature: userSignature } = await txb.sign({
        client: suiClient,
        signer: ephemeralKeyPair,
      })
      const zkLoginSignature: SerializedSignature = getZkLoginSignature({
        inputs: sender.zkLoginInput,
        maxEpoch: sender.maxEpoch,
        userSignature,
      })
      return suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
        options: {
          showEffects: true,
        },
      })
    }
  },
}
