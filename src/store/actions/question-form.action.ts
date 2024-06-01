import { TQuizApi } from '@/src/types/global'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { quizServices } from '../services/quiz.service'

export const getQuizData = createAsyncThunk('questionForm/getQuizData', async (id: string) => {
  const res = await quizServices.getQuizData(id)
  return res.data?.data
})

export const postQuiz = createAsyncThunk('questionForm/postQuiz', async (data: TQuizApi) => {
  const res = await quizServices.postQuiz(data)
  return res.data?.data
})
