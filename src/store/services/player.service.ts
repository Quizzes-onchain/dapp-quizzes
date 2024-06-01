import { LEADERBOARD, PLAYER, SUBMIT_ANSWER } from '@/src/constant/endpoint.constant'
import axiosClient from './axiosClient'

type JoinGameProps = {
  name: string
  gameId: string
}

type SubmitAnswerProps = {
  answerId: string
  time: string
  questionId: string
  playerId: string
}

export const playerServices = {
  joinGame: async (data: JoinGameProps) => {
    return axiosClient.post(PLAYER, data)
  },
  outGame: async (id: string) => {
    return axiosClient.delete(`${PLAYER}/${id}`)
  },
  getLeaderBoard: async (pinId: string) => {
    return axiosClient.get(`${PLAYER}${LEADERBOARD}/${pinId}`)
  },
  getPlayerInfo: async (gameId: string) => {
    return axiosClient.get(`${PLAYER}/${gameId}`)
  },
  submitAnswer: async (data: SubmitAnswerProps) => {
    return axiosClient.post(`${PLAYER}${SUBMIT_ANSWER}`, data)
  },
}
