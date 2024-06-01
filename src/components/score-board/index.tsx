'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { FAKE_MOTION_DELAY } from '@/src/constant/score-board.constant'
import { HOST_END_GAME, HOST_START_QUESTION } from '@/src/constant/socket.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { setCurrentQuestion, setQuestionData } from '@/src/store/reducers/answer-question.reducer'
import { TQuestionSocket, TScoreBoardItemSocket } from '@/src/types/global'
import { shuffle } from '@/src/utils/lib'
import { animated, useTransition } from '@react-spring/web'
import UserCard from './user-card'

const ScoreBoard = () => {
  const preScoreBoard = useAppSelector((state) => state.answerQuestion.preScoreBoard)
  const scoreBoard = useAppSelector((state) => state.answerQuestion.scoreBoard)
  const currentQuestion = useAppSelector((state) => state.answerQuestion.currentQuestion)
  const totalQuestion = useAppSelector((state) => state.answerQuestion.totalQuestion)
  const socket = useAppSelector((state) => state.socket.socket)
  const dispatch = useAppDispatch()

  const [userList, setUserList] = useState<TScoreBoardItemSocket[]>(preScoreBoard)

  const params = useSearchParams()
  const pin = params.get('pin') || ''
  const playerId = params.get('playerId') || ''

  const router = useRouter()

  let hIndex = 0
  const transitions = useTransition(
    userList.map((data) => ({ ...data, y: (hIndex += 76) - 76 })),
    {
      key: (item: TScoreBoardItemSocket) => item.playerId,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
    }
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserList(scoreBoard)
    }, FAKE_MOTION_DELAY)

    return () => clearTimeout(timeout)
  }, [scoreBoard])

  useEffect(() => {
    socket?.on(HOST_START_QUESTION, (data: TQuestionSocket) => {
      // Shuffle question options
      shuffle(data.options)

      dispatch(setCurrentQuestion(data.questionIndex + 1))
      dispatch(setQuestionData(data))

      router.push(`/answer-question?pin=${pin}&playerId=${playerId}`)
    })

    return () => {
      socket?.off(HOST_START_QUESTION)
    }
  }, [socket, dispatch, router, totalQuestion, currentQuestion, pin, playerId])

  // Navigate to home when host end game
  useEffect(() => {
    socket?.on(HOST_END_GAME, () => {
      router.push('/point-chart')

      return () => socket?.off(HOST_END_GAME)
    })
  }, [socket, router])

  return (
    <div className='w-full flex flex-col items-center px-[16px] pb-[16px] gap-[40px] animate-fade-up'>
      <div className='py-[16px] font-semibold text-[24px] leading-[30.24px]'>ScoreBoard</div>
      <div className='h-full w-full gap-[16px] flex flex-col'>
        {transitions((style, item, t, index) => (
          <animated.div className='w-full' style={{ zIndex: userList.length - index, ...style }}>
            <UserCard user={item} currentUser={item.playerId === playerId} />
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default ScoreBoard
