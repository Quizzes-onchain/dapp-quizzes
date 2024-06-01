'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import leftChevron from '@/public/assets/icons/common/left-chevron.svg'
import { QUESTION_FORM } from '@/src/constant/questionForm.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { setFormData } from '@/src/store/reducers/question-form.reducer'
import Link from 'next/link'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import QuestionPreviewCard from './QuestionPreviewCard'

const CreatedQuestionsPreview = () => {
  const questionForm = useAppSelector((state) => state.questionForm)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!questionForm.title) {
      if (typeof window === 'undefined') return

      const rawData = localStorage.getItem(QUESTION_FORM)
      const data = rawData && JSON.parse(rawData)

      if (data?.title) {
        dispatch(setFormData(data))
      }
    }
  }, [dispatch, questionForm.title])

  return (
    <div className='flex flex-col h-full w-full animate-fade-up'>
      <QuizzesHeaderContainer>
        <Link href='/create-quizzes/add-question?edit=true'>
          <Image className='cursor-pointer hover:opacity-75' src={leftChevron} alt='' />
        </Link>

        <h1 className='text-center text-base font-bold text-black'>Preview</h1>

        <div className='w-6 h-1' />
      </QuizzesHeaderContainer>

      {questionForm.questions.length ? (
        <div className='flex-1 flex flex-col gap-4 px-4 pb-4 pt-8 overflow-auto no-scrollbar'>
          {questionForm.questions.map((question, index) => (
            <QuestionPreviewCard key={index} data={question} order={index + 1} />
          ))}
        </div>
      ) : (
        <p className='text-base font-semibold text-center text-[#ccc] mt-4'>Empty question</p>
      )}
    </div>
  )
}

export default CreatedQuestionsPreview
