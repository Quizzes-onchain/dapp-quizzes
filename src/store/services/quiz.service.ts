import { CONTRACT_METHOD, CONTRACT_MODULE } from '@/src/constant/contract.constant'
import { PUBLIC, QUIZ } from '@/src/constant/endpoint.constant'
import { TQuizApi, TQuizOnchain, TZkAccount } from '@/src/types/global'
import { keypairFromSecretKey } from '@/src/utils/lib'
import { getZkAccounts } from '@/src/utils/local-storage'
import { SerializedSignature } from '@mysten/sui.js/cryptography'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { getZkLoginSignature } from '@mysten/zklogin'
import { QuizData } from '../reducers/quiz.reducer'
import axiosClient from './axiosClient'
import suiClient from './suiClient'

export const quizServices = {
  getQuizzes: async () => {
    return axiosClient.get('/' + QUIZ)
  },
  getQuizData: async (id: string) => {
    return axiosClient.get('/' + QUIZ + '/' + id)
  },
  getPublicQuiz: async () => {
    return axiosClient.get('/' + QUIZ + '/' + PUBLIC)
  },
  postQuiz: async (data: TQuizApi) => {
    return axiosClient.post('/' + QUIZ, data)
  },
  deleteQuiz: async (id: string) => {
    return axiosClient.delete('/' + QUIZ + '/' + id)
  },
  getQuizzesOnchain: async (account: TZkAccount, quizList: QuizData[]) => {
    const res = await suiClient.getOwnedObjects({
      owner: account.userAddr,
      filter: {
        MoveModule: {
          package: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
          module: CONTRACT_MODULE,
        },
      },
      options: {
        showBcs: true,
        showContent: true,
        showDisplay: true,
        showOwner: true,
        showPreviousTransaction: true,
        showStorageRebate: true,
        showType: true,
      },
      cursor: null,
      limit: null,
    })
    return { res, quizList }
  },
  postQuizOnchain: async (data: TQuizOnchain) => {
    const account = getZkAccounts()
    if (account.length > 0) {
      const txb = new TransactionBlock()

      const sender = account[0]
      txb.setSender(sender.userAddr)
      const { hashId, title, visibility, image, checksum } = data
      const formatdata = [hashId, title, visibility, image || '', checksum]

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      const contractModule = CONTRACT_MODULE
      const contractMethod = CONTRACT_METHOD.CREATE_QUIZ

      txb.moveCall({
        target: `${contractAddress}::${contractModule}::${contractMethod}`,
        arguments: formatdata.map((item) => txb.pure(item)),
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
  deleteQuizOnchain: async (objectAddress: string) => {
    const account = getZkAccounts()
    if (account.length > 0) {
      const txb = new TransactionBlock()

      const sender = account[0]
      txb.setSender(sender.userAddr)

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
      const contractModule = CONTRACT_MODULE
      const contractMethod = CONTRACT_METHOD.DELETE_QUIZ

      txb.moveCall({
        target: `${contractAddress}::${contractModule}::${contractMethod}`,
        arguments: [txb.pure(objectAddress)],
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

      suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkLoginSignature,
        options: {
          showEffects: true,
        },
      })

      return objectAddress
    }
  },
}
