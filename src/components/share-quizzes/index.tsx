'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import MainButton from '@/src/components/common/main-button'

import JoinedPlayer from '@/src/components/common/joined-player'
import { PLAYER_JOINED, PLAYER_OUT, START_GAME } from '@/src/constant/socket.constant'
import { START_QUESTION_TIME } from '@/src/constant/start-question-time.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { setTotalQuestion } from '@/src/store/reducers/answer-question.reducer'
import { gameServices } from '@/src/store/services/game.service'
import { playerServices } from '@/src/store/services/player.service'
import { TJoinedPlayer } from '@/src/types/global'
import { handleSetNewPlayerList } from '@/src/utils/lib'
import Share from './share'

type TTab = 'player' | 'share'

const ShareQuizzes = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [tab, setTab] = useState<TTab>('share')
  const [playerList, setPlayerList] = useState<TJoinedPlayer[]>([])
  const [countdown, setCountdown] = useState<number>(-1)

  const socket = useAppSelector((state) => state.socket.socket)
  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()
  const pin = searchParams.get('pin') || ''
  const gameId = searchParams.get('gameId') || ''
  const quizId = searchParams.get('quizId') || ''
  const objectId = searchParams.get('objectId') || ''

  const router = useRouter()

  const handleStartGame = async () => {
    setLoading(true)
    try {
      const res = await gameServices.startGame(gameId)
      const data = res.data?.data

      if (data?.isLive) {
        dispatch(setTotalQuestion(data.totalQuestions))
        socket?.emit(START_GAME, { pin, totalQuestion: data.totalQuestions }, () => {
          setCountdown(START_QUESTION_TIME)
        })
      } else {
        toast.error('Failed to start game')
      }
    } catch (error) {
      toast.error('Failed to start game')
    }
    setLoading(false)
  }

  // Countdown to navigate to start game page
  useEffect(() => {
    if (countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timeout)
    }

    if (countdown === 0) {
      router.push(`/start-game?pin=${pin}&quizId=${quizId}&objectId=${objectId}`)
    }
  }, [countdown, router, pin, quizId, objectId])

  // Get leader board
  useEffect(() => {
    ;(async () => {
      try {
        const res = await playerServices.getLeaderBoard(pin)
        const data = res.data?.data

        if (data) {
          setPlayerList(data)
        }
      } catch (error) {
        toast.error('Failed to get player list')
      }
    })()
  }, [pin])

  // Listen player joined
  useEffect(() => {
    socket?.on(PLAYER_JOINED, (data: TJoinedPlayer) => {
      if (data) {
        setPlayerList((prev) => handleSetNewPlayerList(prev, data))
      }
    })
  }, [socket])

  // Remove player outed from the game
  useEffect(() => {
    socket?.on(PLAYER_OUT, (data: { playerId: string }) => {
      if (data) {
        const newPlayerList = playerList.filter((player) => player.playerId !== data.playerId)
        setPlayerList(newPlayerList)
      }
    })

    return () => {
      socket?.off(PLAYER_OUT)
    }
  }, [playerList, socket])

  return (
    <div className='relative h-full flex flex-col gap-4 bg-[#0000000F] p-4 rounded-xl animate-fade-up'>
      <div className='flex items-center justify-between bg-white rounded-lg'>
        <button
          className={`w-1/2 py-4 text-center font-semibold m-2 rounded-lg text-[#18191B] bg-[#F5F6F6] ${
            tab === 'share' ? 'border-b-2 border-[#0085DD]' : ''
          }`}
          onClick={() => setTab('share')}
        >
          Share
        </button>

        <button
          className={`w-1/2 py-4 text-center font-semibold m-2 rounded-lg text-[#18191B] bg-[#F5F6F6] ${
            tab === 'player' ? 'border-b-2 border-[#0085DD]' : ''
          }`}
          onClick={() => setTab('player')}
        >
          Players
        </button>
      </div>

      {countdown > 0 && (
        <div className='flex items-center justify-center bg-white rounded-lg'>
          <p className='text-center font-semibold m-2'>Game will start in {countdown} seconds</p>
        </div>
      )}

      <div className='flex-1 overflow-hidden'>{tab === 'share' ? <Share /> : <JoinedPlayer data={playerList} />}</div>

      <MainButton disabled={loading || countdown > 0} className='' onClick={handleStartGame}>
        {loading || countdown > 0 ? 'Starting' : 'Start'}
      </MainButton>
    </div>
  )
}

export default ShareQuizzes
