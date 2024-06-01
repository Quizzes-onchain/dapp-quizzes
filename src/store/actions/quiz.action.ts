import { TGetQuizOnchainInput, TQuizOnchain } from '@/src/types/global'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { quizServices } from '../services/quiz.service'

export const getQuizzes = createAsyncThunk('quiz/getQuizzes', async () => {
  const res = await quizServices.getQuizzes()
  return res.data?.data
})

export const deleteQuiz = createAsyncThunk('quiz/deleteQuiz', async (id: string) => {
  const res = await quizServices.deleteQuiz(id)
  return res.data?.data
})

export const getQuizzesOnchain = createAsyncThunk('quiz/getQuizzesOnchain', async (data: TGetQuizOnchainInput) => {
  const res = await quizServices.getQuizzesOnchain(data.account, data.quizListOffchain)
  return res
})

export const postQuizOnchain = createAsyncThunk(
  'quiz/postQuizOnchain',
  async (data: TQuizOnchain, { rejectWithValue }) => {
    try {
      const _data = await quizServices.postQuizOnchain(data)
      return _data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteQuizOnchain = createAsyncThunk(
  'quiz/deleteQuizOnchain',
  async (objectAddress: string, { rejectWithValue }) => {
    try {
      const _data = await quizServices.deleteQuizOnchain(objectAddress)
      return _data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
