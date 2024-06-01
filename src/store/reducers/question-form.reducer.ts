import { ChoiceProps } from '@/src/components/add-question'
import { initialChoiceList } from '@/src/constant/add-question.constant'
import { QUESTION_FORM as TQuestionForm } from '@/src/constant/questionForm.constant'
import { TQuestionApi, questionType } from '@/src/types/global.d'
import { createSlice } from '@reduxjs/toolkit'
import { getQuizData } from '../actions/question-form.action'

type TQuestionItem = {
  id: number
  question: string
  choices: ChoiceProps[]
  thumbnail?: string | null
  point: number
  time: number
}

type VisibilityQuestionForm = 'public' | 'private'

type TQuestionForm = {
  questions: TQuestionItem[]
  title: string
  visibility: VisibilityQuestionForm
  currentQuestionType: questionType
  thumbnail?: string
  firstAppearQuestionId: number
}

const initialState: TQuestionForm = {
  questions: [],
  title: '',
  visibility: 'public',
  currentQuestionType: 'question_blank',
  thumbnail: undefined,
  firstAppearQuestionId: 0,
}

const questionForm = createSlice({
  name: 'questionForm',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')

      state.title = action.payload.title
      state.visibility = action.payload.visibility
      state.thumbnail = action.payload.thumbnail
      state.questions = action.payload.questions

      localStorage.setItem(TQuestionForm, JSON.stringify({ ...questionFormLocal, ...action.payload }))
    },
    setQuestionForm: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')

      state.questions = action.payload
      localStorage.setItem(TQuestionForm, JSON.stringify({ ...questionFormLocal, questions: action.payload }))
    },
    addQuestion: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')

      const isExitedId = state.questions.find((question) => question.id === action.payload.id)
      let newQuestions

      if (isExitedId) {
        newQuestions = state.questions.map((question) => {
          if (question.id === action.payload.id) {
            return { ...action.payload }
          }
          return question
        })

        state.questions = newQuestions
      } else {
        state.questions.push({ ...action.payload })

        if (questionFormLocal.questions) {
          newQuestions = [...questionFormLocal.questions, action.payload]
        } else {
          newQuestions = [action.payload]
        }
      }

      const localFormData = { ...initialState, ...questionFormLocal, questions: newQuestions }

      localStorage.setItem(TQuestionForm, JSON.stringify(localFormData))
    },
    removeQuestion: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')
      const newQuestionForm = state.questions.filter((question) => question.id !== action.payload)

      state.questions = newQuestionForm
      localStorage.setItem(TQuestionForm, JSON.stringify({ ...questionFormLocal, questions: newQuestionForm }))
    },
    setFormState: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')

      state.title = action.payload.title
      state.visibility = action.payload.visibility
      state.thumbnail = action.payload.thumbnail

      localStorage.setItem(TQuestionForm, JSON.stringify({ ...questionFormLocal, ...action.payload }))
    },
    setQuestionType: (state, action) => {
      const questionFormLocal = JSON.parse(localStorage.getItem(TQuestionForm) || '{}')

      state.currentQuestionType = action.payload
      localStorage.setItem(TQuestionForm, JSON.stringify({ ...questionFormLocal, currentQuestionType: action.payload }))
    },
    setFirstAppearQuestionId: (state, action) => {
      state.firstAppearQuestionId = action.payload
    },
    resetFormQuestion: () => {
      localStorage.setItem(TQuestionForm, JSON.stringify(initialState))

      return initialState
    },
  },
  extraReducers: (builder) => {
    // Update the question form data from api
    builder.addCase(getQuizData.fulfilled, (state, action) => {
      const fomartedQuestionForm = JSON.parse(JSON.stringify(initialState))
      fomartedQuestionForm.firstAppearQuestionId = 0
      fomartedQuestionForm.title = action.payload.title
      fomartedQuestionForm.visibility = action.payload.visibility ? 'public' : 'private'
      fomartedQuestionForm.thumbnail = action.payload.image
      fomartedQuestionForm.questions = action.payload.questions.map((question: TQuestionApi, index: number) => {
        return {
          id: index + 1,
          question: question.question,
          point: question.point,
          time: question.time,
          thumbnail: question.image,
          choices: initialChoiceList.map((choice, index) => {
            return {
              value: question.options?.[index]?.text || `Choice ${index + 1}`,
              isAns: question.options?.[index]?.isCorrect || false,
              id: choice?.id || '',
              thumbnail: question.options?.[index]?.image || '',
            }
          }),
        }
      })

      localStorage.setItem(TQuestionForm, JSON.stringify(fomartedQuestionForm))
      return fomartedQuestionForm
    })
  },
})

export type { TQuestionForm, TQuestionItem }
export default questionForm.reducer
export const {
  setFormData,
  setFormState,
  setQuestionForm,
  addQuestion,
  removeQuestion,
  setQuestionType,
  setFirstAppearQuestionId,
  resetFormQuestion,
} = questionForm.actions
