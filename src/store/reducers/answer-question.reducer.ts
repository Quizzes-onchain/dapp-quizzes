import { TQuestionSocket, TScoreBoardItemSocket } from '@/src/types/global'
import { createSlice } from '@reduxjs/toolkit'

type TAnswerQuestionState = {
  questionData: TQuestionSocket | null
  scoreBoard: TScoreBoardItemSocket[]
  preScoreBoard: TScoreBoardItemSocket[]
  currentQuestion: number
  totalQuestion: number
}

const initialState: TAnswerQuestionState = {
  questionData: null,
  scoreBoard: [],
  preScoreBoard: [],
  currentQuestion: 0,
  totalQuestion: 0,
}

const answerQuestionReducer = createSlice({
  name: 'answerQuestion',
  initialState,
  reducers: {
    setQuestionData(state, action) {
      state.questionData = action.payload
    },
    setScoreBoard(state, action) {
      state.preScoreBoard = state.scoreBoard

      state.scoreBoard = action.payload
    },
    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload
    },
    setTotalQuestion(state, action) {
      state.totalQuestion = action.payload
    },
  },
})

export type { TAnswerQuestionState }

export const { setQuestionData, setScoreBoard, setCurrentQuestion, setTotalQuestion } = answerQuestionReducer.actions
export default answerQuestionReducer.reducer
