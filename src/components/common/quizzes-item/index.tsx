'use client'

import deleteIcon from '@/public/assets/icons/share-quizzes/delete.svg'
import editIcon from '@/public/assets/icons/share-quizzes/edit.svg'
import shareIcon from '@/public/assets/icons/share-quizzes/share.svg'
import avatar from '@/public/assets/images/header/person.svg'
import imageDefaultIcon from '@/public/assets/icons/common/imageDefault.svg'
import { INIT_GAME } from '@/src/constant/socket.constant'
import { useAppDispatch, useAppSelector } from '@/src/hooks/appHook'
import { getQuizData } from '@/src/store/actions/question-form.action'
import { deleteQuiz, deleteQuizOnchain } from '@/src/store/actions/quiz.action'
import { QuizData } from '@/src/store/reducers/quiz.reducer'
import { gameServices } from '@/src/store/services/game.service'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import MainButton from '../main-button'

const buttons = [
  {
    icon: shareIcon,
    title: 'Share',
    type: 'share',
  },
  {
    icon: editIcon,
    title: 'Edit',
    type: 'edit',
  },
  {
    icon: deleteIcon,
    title: 'Delete',
    type: 'delete',
  },
]

type QuizzesItemProps = {
  data: QuizData
}

const QuizzesItem = ({ data }: QuizzesItemProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const socket = useAppSelector((state) => state.socket.socket)

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleJoinQuiz = async () => {
    try {
      const newGame = await gameServices.createGame(data.id)
      const pin = newGame.data?.data.pin
      const gameId = newGame.data?.data.id

      socket?.emit(INIT_GAME, {
        gameId,
        pin,
      })

      router.push(`/share-quizzes?pin=${pin}&gameId=${gameId}&quizId=${data.id}&objectId=${data.objectId}`)
    } catch (err) {
      toast.error('Failed to create game')
    }
  }

  const handleDeleteQuiz = async () => {
    setLoading(true)
    try {
      const res = await dispatch(deleteQuiz(data.id))
      if (res.payload) {
        // Delete quiz onchain after delete on api success
        try {
          await dispatch(deleteQuizOnchain(data.objectId))
          setLoading(false)
          toast.success('Deleted quiz successfully')
        } catch (err) {
          setLoading(false)
          toast.error('Failed to delete quiz onchain')
        }
        return
      }

      setLoading(false)
      toast.error('Failed to delete quiz api')
    } catch (err) {
      setLoading(false)
      toast.error('Failed to delete quiz api')
    }
  }

  const handleActionClick = (type: string) => {
    switch (type) {
      case 'share':
        handleJoinQuiz()
        break
      case 'edit':
        toast.info('Coming soon!')
        return
        dispatch(getQuizData(data.id))
        router.push(`/create-quizzes/add-question?quizId=${data.id}&edit=true`)
        break
      case 'delete':
        handleDeleteQuiz()
        break
      default:
    }
  }

  return (
    <div className='bg-white p-4 rounded-xl shadow-[#0000001A] shadow-md'>
      <div className='space-y-4'>
        {/* Quizzes Info */}
        <div className='flex gap-4'>
          <div className='w-40 h-[100px] relative'>
            <Image src={data.thumbnail || imageDefaultIcon} alt='quiz-img' className='rounded-md object-cover' fill />
          </div>{' '}
          <div className='flex flex-col justify-between'>
            <div className='space-y-2'>
              <p className='text-base leading-5 font-semibold text-[#18191B]'>{data.title}</p>
              <p className='text-sm leading-[18px] text-[#A5A5B5]'>Quiz</p>
            </div>
            <div className='flex items-center gap-2'>
              <Image src={avatar} alt='avatar' className='size-8 rounded-full' />
              <p className='text-sm font-medium text-black'>Hydra</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-3 gap-4'>
          {buttons.map((btn) => {
            const { icon, title, type } = btn
            return (
              <button
                key={title}
                className='flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#F7F7F7] hover:opacity-70'
                onClick={() => handleActionClick(btn.type)}
              >
                <Image src={icon} alt={title} className='size-6' />
                <p className='text-sm font-medium text-black'>
                  {type === 'delete' ? `${loading ? 'Deleting...' : title}` : title}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      <MainButton className='mt-6' onClick={handleJoinQuiz}>
        Start
      </MainButton>
    </div>
  )
}

export default QuizzesItem
