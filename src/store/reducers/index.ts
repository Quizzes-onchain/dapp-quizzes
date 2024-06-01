import { combineReducers } from '@reduxjs/toolkit'

import answerQuestionReducer from './answer-question.reducer'
import questionFormReducer from './question-form.reducer'
import quizReducer from './quiz.reducer'
import socketReducer from './socket.reducer'
import userReducer from './user.reducer'

const rootReducer = combineReducers({
  questionForm: questionFormReducer,
  user: userReducer,
  quiz: quizReducer,
  socket: socketReducer,
  answerQuestion: answerQuestionReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
