/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHashId } from '@/src/utils/lib'
import { createSlice } from '@reduxjs/toolkit'
import { deleteQuiz, getQuizzesOnchain } from '../actions/quiz.action'

export type QuizData = {
  id: string
  objectId: string
  thumbnail?: string
  title: string
}

const initialState: QuizData[] = []

const quizReducer = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizzesOnchain.fulfilled, (state, action) => {
      const newQuizList: QuizData[] = []

      action.payload?.quizList.forEach((quiz: any) => {
        const quizData = {
          id: quiz.id,
          objectId: '',
          title: quiz.title,
          thumbnail: quiz.image,
        }

        action.payload.res.data.forEach((quizOnchain: any) => {
          // Compare quiz id in backend with hash_id onchain
          if (createHashId(quiz.id) === quizOnchain.data?.content.fields.hash_id)
            quizData.objectId = quizOnchain.data?.objectId
        })

        newQuizList.push(quizData)
      })
      return newQuizList
    })
    builder.addCase(deleteQuiz.fulfilled, (state, action) => {
      return state.filter((quiz) => quiz.id !== action.payload)
    })
  },
})

export default quizReducer.reducer
