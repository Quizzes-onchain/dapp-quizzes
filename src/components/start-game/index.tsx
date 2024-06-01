'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { END_GAME, PLAYER_ANSWERED, START_QUESTION } from '@/src/constant/socket.constant'
import {
  PREPARE_NEXT_QUESTION_TIME,
  RESULT_SHOW_TIME,
  SCOREBOARD_TIME,
} from '@/src/constant/start-question-time.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import useCounter from '@/src/hooks/use-counter'
import { setScoreBoard } from '@/src/store/reducers/answer-question.reducer'
import { gameServices } from '@/src/store/services/game.service'
import { quizServices } from '@/src/store/services/quiz.service'
import { TQuestionEmitSocket, TQuestionSocket, TScoreBoardItemSocket } from '@/src/types/global'
import MainButton from '../common/main-button'

const StartGame = ({ autoNext = true }: { autoNext?: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [questionList, setQuestionList] = useState<TQuestionSocket[]>([])
  const [countdownNext, setCountdownNext] = useState<number>(-1)
  const scoreBoard = useAppSelector((state) => state.answerQuestion.scoreBoard)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)

  const socket = useAppSelector((state) => state.socket.socket)
  const totalQuestion = useAppSelector((state) => state.answerQuestion.totalQuestion)
  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()
  const quizId = searchParams.get('quizId') || ''
  const objectId = searchParams.get('objectId') || ''
  const pin = searchParams.get('pin') || ''

  const router = useRouter()

  useCounter({ time: countdownNext, setTime: setCountdownNext })

  const handleFormatQuestionData = useCallback(
    (questionData: TQuestionSocket) => {
      if (!questionData?.question) return

      const data: TQuestionEmitSocket = {
        pin,
        question: {
          questionIndex: currentQuestion,
          id: questionData.id,
          time: questionData.time,
          questionId: questionData.questionId,
          question: questionData.question,
          image: questionData.image,
          options: questionData.options,
          point: questionData.point,
        },
      }

      return data
    },
    [currentQuestion, pin]
  )

  useEffect(() => {
    socket?.on(PLAYER_ANSWERED, (leaderBoard: TScoreBoardItemSocket) => {
      dispatch(setScoreBoard(leaderBoard))
    })

    return () => {
      socket?.off(PLAYER_ANSWERED)
    }
  }, [socket, dispatch])

  const nextQuestion = useCallback(async () => {
    if (currentQuestion + 1 === totalQuestion) {
      socket?.emit(END_GAME, { pin })
      try {
        await gameServices.submitScoreBoard(scoreBoard, objectId)
      } catch (error) {
        toast.error('Failed to submit score board')
      }

      router.push('/point-chart')
      return
    }

    const data = handleFormatQuestionData(questionList[currentQuestion])

    if (data) {
      socket?.emit(START_QUESTION, data, () => {
        console.log('Sent question', data)
      })
      if (autoNext) {
        setCountdownNext(data.question.time + RESULT_SHOW_TIME + SCOREBOARD_TIME + PREPARE_NEXT_QUESTION_TIME)
      }
    }
    setCurrentQuestion(currentQuestion + 1)
  }, [
    currentQuestion,
    totalQuestion,
    handleFormatQuestionData,
    questionList,
    socket,
    pin,
    scoreBoard,
    router,
    autoNext,
    objectId,
  ])

  // Sent first question when component mounted
  useEffect(() => {
    const data = handleFormatQuestionData(questionList[currentQuestion])

    if (data) {
      socket?.emit(START_QUESTION, data, () => {
        console.log('Sent question', data)
      })
      if (autoNext) {
        setCountdownNext(data.question.time + RESULT_SHOW_TIME + SCOREBOARD_TIME + PREPARE_NEXT_QUESTION_TIME)
      }
    }
  }, [socket, currentQuestion, questionList, handleFormatQuestionData, autoNext])

  // Next question when countdownNext === 0
  useEffect(() => {
    if (countdownNext === 0) {
      nextQuestion()
    }
  }, [countdownNext, nextQuestion])

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const res = await quizServices.getQuizData(quizId)
        const data = res.data?.data

        if (data?.questions?.length) {
          setLoading(false)
          setQuestionList(data.questions)
        }
      } catch (err) {
        setLoading(false)
        toast.error('Failed to get quiz data')
      }
    })()
  }, [quizId])

  return (
    <div className='animate-fade-up'>
      <MainButton disabled={loading || autoNext} onClick={nextQuestion}>
        {autoNext ? `Auto next question mode: ` : 'Next question: '}
        {currentQuestion + 1}/{totalQuestion}
      </MainButton>
    </div>
  )
}

export default StartGame
