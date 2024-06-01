'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import leftChevronIcon from '@/public/assets/icons/common/left-chevron.svg'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { getQuizzes, getQuizzesOnchain } from '@/src/store/actions/quiz.action'
import { QuizData } from '@/src/store/reducers/quiz.reducer'
import { getZkAccounts } from '@/src/utils/local-storage'
import { ColorRing } from 'react-loader-spinner'
import QuizzesHeaderContainer from '../common/header/quizzes-header-container'
import QuizzesItem from '../common/quizzes-item'

const QuizList = () => {
  const [loading, setLoading] = useState<boolean>(true)

  const listData = useAppSelector((state) => state.quiz)
  const dispatch = useAppDispatch()
  const account = useMemo(() => getZkAccounts(), [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await dispatch(getQuizzes())
        const quizListOffchain: QuizData[] = res.payload

        try {
          await dispatch(
            getQuizzesOnchain({
              account: account[0],
              quizListOffchain: quizListOffchain,
            })
          )
          setLoading(false)
        } catch (err) {
          setLoading(false)
          toast.error('Failed to get quiz onchain')
        }
      } catch (err) {
        setLoading(false)
        toast.error('Failed to get quiz api')
      }
    })()
  }, [account, dispatch])

  return (
    <div className='flex flex-col h-full w-full animate-fade-up'>
      <QuizzesHeaderContainer>
        <Link href='/home'>
          <Image className='cursor-pointer hover:opacity-75' src={leftChevronIcon} alt='' />
        </Link>

        <h1 className='text-base w-full text-center font-bold leading-5 text-black'>Quiz List</h1>

        <div className='h-px w-6' />
      </QuizzesHeaderContainer>

      {!loading ? (
        <div className='flex flex-col gap-8 px-4 pt-8 pb-4 flex-1 overflow-auto no-scrollbar bg-[#FBFBFB]'>
          {listData?.length ? (
            listData.map((item, index) => <QuizzesItem key={index} data={item} />)
          ) : (
            <span className='flex items-center justify-center text-slate-300 text-base'>Empty</span>
          )}
        </div>
      ) : (
        <div className='flex h-full w-full items-center justify-center'>
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='color-ring-loading'
            wrapperStyle={{}}
            wrapperClass='color-ring-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
    </div>
  )
}

export default QuizList
