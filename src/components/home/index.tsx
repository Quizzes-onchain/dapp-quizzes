'use client'

import fireIcon from '@/public/assets/icons/home/fire.svg'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { getQuizzes, getQuizzesOnchain } from '@/src/store/actions/quiz.action'
import { QuizData } from '@/src/store/reducers/quiz.reducer'
import { quizServices } from '@/src/store/services/quiz.service'
import { TPublicQuizData } from '@/src/types/global'
import { getRole, getZkAccounts } from '@/src/utils/local-storage'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import PublicQuizzCard from '../common/public-quizz-card'
import QuizzesItem from '../common/quizzes-item'

const HomePage = () => {
  const listData = useAppSelector((state) => state.quiz)
  const dispatch = useAppDispatch()
  const account = useMemo(() => getZkAccounts(), [])
  const role = getRole()

  const [listPublicQuiz, setListPublicQuiz] = useState<TPublicQuizData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        if (role === 'Admin') {
          const res = await dispatch(getQuizzes())
          const quizListOffchain: QuizData[] = res.payload
          await dispatch(
            getQuizzesOnchain({
              account: account[0],
              quizListOffchain,
            })
          )
        } else {
          try {
            const res = await quizServices.getPublicQuiz()
            setListPublicQuiz(res.data?.data)
          } catch (err) {
            toast.error('Failed to get quizzes api')
          }
        }
      } catch (err) {
        toast.error('Failed to get quizzes on-chain')
      }
    })()
  }, [account, dispatch, role])

  return (
    <div className='flex flex-col h-full w-full'>
      {role === 'Admin' ? (
        <div className='flex flex-col h-full w-full'>
          <div className='flex flex-col gap-4 px-4 pt-4 pb-4 flex-1 overflow-auto no-scrollbar bg-[#FBFBFB]'>
            <div className='bg-[#FBFBFB]'>
              <h1 className='px-4 pt-4 text-xl w-full text-left font-semibold leading-5 text-black'>Recent</h1>
            </div>
            {listData?.length ? (
              listData.map((item, index) => <QuizzesItem key={index} data={item} />)
            ) : (
              <span className='flex items-center justify-center text-slate-300 text-base'>Empty</span>
            )}
          </div>{' '}
        </div>
      ) : (
        <div className='flex flex-col h-full w-full bg-[#FBFBFB]'>
          <div className='bg-[#FBFBFB] pt-4 flex flex-row'>
            <h1 className='pl-4 pr-2 text-xl pt-1 font-semibold leading-5 text-black'>New</h1>
            <Image src={fireIcon} alt='' />
          </div>
          {listPublicQuiz?.length !== 0 ? (
            <div className='grid grid-cols-2 gap-4 px-4 pt-4 pb-4 overflow-auto no-scrollbar bg-[#FBFBFB]'>
              {listPublicQuiz?.length
                ? listPublicQuiz.map((item, index) => <PublicQuizzCard key={index} data={item} />)
                : null}
            </div>
          ) : (
            <span className='flex items-center justify-center text-slate-300 text-base pt-4'>Empty</span>
          )}
        </div>
      )}
    </div>
  )
}

export default HomePage
