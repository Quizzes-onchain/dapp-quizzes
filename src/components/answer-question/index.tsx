'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import wrongGif from '@/public/assets/images/answer-question/wrong.gif'
import imageDefaultIcon from '@/public/assets/icons/common/imageDefault.svg'
import { OPTIONS } from '@/src/constant/answer-question.constant'
import { HOST_START_QUESTION, SEND_ANSWER } from '@/src/constant/socket.constant'
import { PREPARE_NEXT_QUESTION_TIME, RESULT_SHOW_TIME } from '@/src/constant/start-question-time.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import useCounter from '@/src/hooks/use-counter'
import { setCurrentQuestion, setQuestionData, setScoreBoard } from '@/src/store/reducers/answer-question.reducer'
import { playerServices } from '@/src/store/services/player.service'
import { TChoiceSocket, TQuestionSocket, TScoreBoardItemSocket } from '@/src/types/global'
import formatTimer from '@/src/utils/format-timer'
import { shuffle } from '@/src/utils/lib'

const AnswerQuestionPage = () => {
  const [countDownStart, setCountDownStart] = useState<number>(PREPARE_NEXT_QUESTION_TIME)
  const [answerQuestionDuration, setAnswerQuestionDuration] = useState<number>(-1)
  const [countDownResult, setCountDownResult] = useState<number>(-1)
  const [answer, setAnswer] = useState<TChoiceSocket | null>(null)
  const [trueAnswerId, setTrueAnswerId] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [finalTimeAnswered, setFinalTimeAnswered] = useState<number>(0)

  const socket = useAppSelector((state) => state.socket.socket)
  const questionData = useAppSelector((state) => state.answerQuestion.questionData)
  const dispatch = useAppDispatch()

  const params = useSearchParams()
  const pin = params.get('pin') || ''
  const playerId = params.get('playerId') || ''

  const { minutes: minute, seconds: second } = formatTimer(answerQuestionDuration)

  const router = useRouter()

  useCounter({ time: countDownStart, setTime: setCountDownStart })
  useCounter({ time: answerQuestionDuration, setTime: setAnswerQuestionDuration })
  useCounter({ time: countDownResult, setTime: setCountDownResult })

  const handleSelectChoice = (choice: TChoiceSocket) => {
    setAnswer(choice)
    setFinalTimeAnswered(answerQuestionDuration)
  }

  const handleStyleChoices = (choice: TChoiceSocket) => {
    if (answerQuestionDuration !== 0) {
      return choice.id === answer?.id ? 'border-[#0085DD] bg-[#0085DD1A]' : 'border-[#E3E3E3]'
    }

    // The answer is correct
    if (choice.id === trueAnswerId) return 'border-[#0085DD] bg-[#0085DD1A]'

    // The answer is wrong
    if (!!trueAnswerId && answer?.id === choice.id && answer?.id !== trueAnswerId) {
      return 'border-[#F5222D] bg-[#FFF1F0]'
    }

    return 'border-[#E3E3E3]'
  }

  const handleSubmitAnswer = useCallback(async () => {
    const data = {
      answerId: answer?.id || '',
      time: '0',
      questionId: questionData?.id || '',
      playerId: playerId,
    }

    try {
      const res = await playerServices.submitAnswer(data)

      setTrueAnswerId(res.data?.data?.trueAnswerId)
    } catch (error) {
      toast.error('Failed to submit answer')
    }
  }, [answer?.id, playerId, questionData])

  // Count down question after countdown start
  useEffect(() => {
    if (countDownStart === 0) {
      setAnswerQuestionDuration(questionData?.time || 0)
    }
  }, [countDownStart, questionData])

  // Sent result of question after answer and countdown result
  useEffect(() => {
    if (answerQuestionDuration === 0) {
      handleSubmitAnswer()
      setCountDownResult(RESULT_SHOW_TIME)
    }
  }, [answerQuestionDuration, handleSubmitAnswer])

  // Navigate to leaderBoard after countdown result
  useEffect(() => {
    if (countDownResult === 0) {
      socket?.emit(SEND_ANSWER, { pin }, (leaderBoard: TScoreBoardItemSocket[]) => {
        dispatch(setScoreBoard(leaderBoard))
      })

      router.push(`/score-board?pin=${pin}&playerId=${playerId}`)
    }
  }, [countDownResult, router, pin, playerId, socket, dispatch])

  useEffect(() => {
    // Get current question data
    socket?.on(HOST_START_QUESTION, (data: TQuestionSocket) => {
      // Shuffle question options
      shuffle(data.options)

      dispatch(setCurrentQuestion(data.questionIndex + 1))
      dispatch(setQuestionData(data))
    })

    return () => {
      socket?.off(HOST_START_QUESTION)
    }
  }, [socket, dispatch])

  return !countDownStart && questionData ? (
    <div className='flex flex-col px-[16px] pb-[16px] gap-[24px] items-center animate-fade-up'>
      <p className='font-bold'>
        {minute}:{second}
      </p>

      <div className='h-[260px] w-full relative'>
        <Image
          className='rounded-[24px]'
          layout='fill'
          objectFit='cover'
          src={questionData?.image || imageDefaultIcon}
          alt='question_image'
        />
      </div>

      <div className='flex flex-col gap-[24px] w-full'>
        <div className='flex flex-row'>
          <p className='font-bold leading-[20.16px]'>{Number(questionData?.questionIndex) + 1}.&nbsp;</p>
          <p className='font-bold leading-[20.16px]'>{questionData?.question}</p>
        </div>

        <div className='flex flex-col gap-3'>
          {questionData?.options.length &&
            questionData.options.map((choice, index) => (
              <button
                key={choice.id}
                className={`flex items-center gap-[10px] border rounded-lg p-4 ${handleStyleChoices(choice)} ${answerQuestionDuration === 0 ? 'pointer-events-none' : ''}`}
                onClick={() => {
                  handleSelectChoice(choice)
                }}
              >
                <div className='flex items-center justify-center size-6 rounded-full p-[10px] bg-[#0085DD1A] text-sm leading-[18px] font-semibold text-black'>
                  {OPTIONS[index].toUpperCase()}
                </div>

                <span className='flex-1 overflow-x-hidden truncate text-sm leading-[18px] font-normal text-black text-left'>
                  {choice.text}
                </span>

                {/* Wrong answer */}
                {trueAnswerId && answer?.id === choice.id && trueAnswerId !== answer?.id && (
                  <Image src={wrongGif} width={24} height={24} alt='wrong' />
                )}

                {/* Correct answer  */}
                {trueAnswerId && answer?.id === choice.id && trueAnswerId === answer?.id && (
                  <div className='relative flex items-center justify-center bg-[#0085DD] size-6 rounded-full p-2'>
                    <span className='absolute font-medium text-[10.5px] leading-[13px] text-white'>
                      + {questionData.point}
                    </span>
                  </div>
                )}
              </button>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='h-full w-full flex justify-center items-center'>{countDownStart}</div>
  )
}

export default AnswerQuestionPage
