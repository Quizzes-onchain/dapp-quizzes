'use client'

import IcBack from '@/public/assets/images/join-quizzes/ic_back.svg'
import IcUser from '@/public/assets/images/join-quizzes/user.png'
import { HOST_END_GAME, HOST_START_GAME, OUT_GAME, PLAYER_JOINED, PLAYER_OUT } from '@/src/constant/socket.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { setTotalQuestion } from '@/src/store/reducers/answer-question.reducer'
import { playerServices } from '@/src/store/services/player.service'
import { TJoinedPlayer } from '@/src/types/global'
import { handleSetNewPlayerList } from '@/src/utils/lib'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import JoinedPlayer from '../common/joined-player'

const JoinQuizzesPage = () => {
  const [countdown, setCountdown] = useState<number>(0)
  const [playerList, setPlayerList] = useState<TJoinedPlayer[]>([])

  const searchParams = useSearchParams()
  const pin = searchParams.get('pin') || ''
  const playerId = searchParams.get('playerId') || ''

  const socket = useAppSelector((state) => state.socket.socket)
  const dispatch = useAppDispatch()

  const navigate = useRouter()

  const handleBack = () => {
    socket?.emit(OUT_GAME, { pin, playerId })

    navigate.back()
  }

  useEffect(() => {
    if (countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [countdown])

  useEffect(() => {
    socket?.on(HOST_START_GAME, (totalQuestion: number) => {
      dispatch(setTotalQuestion(totalQuestion))
      navigate.push(`/answer-question?pin=${pin}&playerId=${playerId}`)
    })

    return () => {
      socket?.off(HOST_START_GAME)
    }
  }, [socket, navigate, pin, playerId, dispatch])

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

  useEffect(() => {
    // Listen player joined
    socket?.on(PLAYER_JOINED, (data: TJoinedPlayer) => {
      if (data) {
        setPlayerList((prev) => handleSetNewPlayerList(prev, data))
      }
    })

    // Out game when admin end the game
    socket?.on(HOST_END_GAME, () => {
      navigate.push('/home')
    })

    return () => {
      socket?.off(PLAYER_JOINED)
      socket?.off(HOST_END_GAME)
    }
  }, [socket, navigate])

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
    <div className='relative bg-white h-screen flex flex-col animate-fade-up'>
      <div className='p-4 flex items-center justify-between'>
        <button onClick={handleBack} className='flex items-center gap-2 hover:opacity-75'>
          <Image src={IcBack} alt='image' draggable={false} className='' />
        </button>
        <div className='text-[24px] font-semibold'>Players</div>
        <div className='flex items-center gap-2'>
          <Image src={IcUser} alt='image' draggable={false} className='rounded-xl' />
          <div className='text-[24px] font-bold'>{playerList.length}</div>
        </div>
      </div>

      <div className='relative bg-white overflow-hidden px-[16px] py-[22px] flex flex-col'>
        <JoinedPlayer data={playerList} />
      </div>
    </div>
  )
}

export default JoinQuizzesPage
