import { ZkLoginInputs } from '@mysten/sui.js/client'

export type questionType = 'question_blank' | 'question_generator' | 'quiz' | 'true_or_false'

export type TProviderZK = 'Google' | 'Twitch' | 'Facebook'
export type TZkSetup = {
  provider: TProviderZK
  maxEpoch: number
  randomness: string
  ephemeralPrivateKey: string
}
export type TZkAccount = {
  provider: TProviderZK
  userAddr: string
  zkLoginInput: ZkLoginInputs
  ephemeralPrivateKey: string
  userSalt: string
  sub: string
  aud: string
  maxEpoch: number
}
export type TZkProofInput = {
  maxEpoch: string
  jwtRandomness: string
  extendedEphemeralPublicKey: string
  jwt: string
  salt: string
  keyClaimName: string
}
export type TQuizOnchain = {
  title: string
  visibility: string
  image?: string
  hashId: string
  checksum: string
}

export type TGetSaltPayload = {
  sub: string
}

export type TSignInPayload = {
  publicAddress: string
  sub: string
  salt: string
}

export type TGetQuizOnchainInput = {
  account: TZkAccount
  quizListOffchain: QuizData[]
}

type TQuestionsOnlyId = {
  id: string
}

export type TPublicQuizData = {
  id: string
  image: string
  title: string
  visibility: boolean
  createdAt: string
  updateAt: string
  questions: TQuestionsOnlyId[]
}

export type TJoinedPlayer = {
  name: string
  score: number
  publicAddress: string
  playerId: string
}

export type TChoiceSocket = {
  id: string
  image?: string
  isCorrect: boolean
  text: string
}

export type TQuestionSocket = {
  id: string
  questionIndex: number
  time: number
  point: number
  questionId: string
  question: string
  image?: string
  options: TChoiceSocket[]
}

export type TQuestionEmitSocket = {
  pin: string
  question: TQuestionSocket
}

export type TScoreBoardItemSocket = {
  playerId: string
  publicAddress: string
  score: string
  name: string
}

export type TOptionApi = {
  text: string
  isCorrect: boolean
  image: string
  id?: string
}

export type TQuestionApi = {
  question: string
  image: string
  time: number
  point: number
  options: TOptionApi[]
}

export type TQuizApi = {
  title: string
  visibility: boolean
  image: string
  questions: TQuestionApi[]
}
