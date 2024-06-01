'use client'

import Logo from '@/public/assets/images/header/logo.svg'
import IcClose from '@/public/assets/images/modal/ic_close.svg'
import { JOIN_GAME } from '@/src/constant/socket.constant'
import { useAppSelector } from '@/src/hooks/appHook'
import { gameServices } from '@/src/store/services/game.service'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import MainButton from '../common/main-button'
import CenterContainerModal from './center-container-modal'

interface JoinQuizzesModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  pin?: string
}
const form = {
  quizzes: 'quizzes',
  name: 'name',
}

export const schema = yup.object({
  [form.quizzes]: yup.string().required('Quizzes is required').default(''),
  [form.name]: yup.string().required('Name is required').default(''),
})
const JoinQuizzesModal = ({ isOpen, setIsOpen, pin }: JoinQuizzesModalProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  const socket = useAppSelector((state) => state.socket.socket)

  const navigate = useRouter()
  const id = useId()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<yup.Asserts<typeof schema>>({
    defaultValues: schema.cast({}),
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: yup.Asserts<typeof schema>) => {
    setLoading(true)
    try {
      const res = await gameServices.joinGame({
        name: data.name,
        pin: data.quizzes,
      })
      const resData = res.data?.data

      if (resData?.id) {
        socket?.emit(JOIN_GAME, {
          pin: data.quizzes,
          player: {
            playerId: resData.id,
            userName: data.name,
          },
        })
        navigate.push(`/join-quizzes?pin=${data.quizzes}&playerId=${resData.id}`)
      } else {
        setLoading(false)
      }
    } catch (error) {
      toast.error('Failed to join game')
      setLoading(false)
    }
  }

  const onErrors = (errors: unknown) => console.error(errors)
  const handleClearValue = (name: string) => setValue(name, '')

  useEffect(() => {
    setValue('quizzes', pin?.substring(4) || '')
  }, [pin, setValue])

  return (
    <CenterContainerModal isOpen={isOpen} setIsOpen={setIsOpen} title={<Title />}>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} className='px-4 pt-4 border-t -mt-4 border-[#E3E3E3]'>
        <div>
          <label htmlFor={'name' + id} className='text-[14px] text-[#A5A5B5]'>
            Your Quizzes on-chain name is...
          </label>
          <div className='relative mt-2'>
            <input
              id={'name' + id}
              {...register(form.name)}
              type='text'
              placeholder='Enter quiz name'
              className='w-full rounded-[8px] border border-[#E3E3E3] bg-[#F2F2F2] p-2 text-[16px] font-semibold focus:outline-none'
            />

            <button
              onClick={() => handleClearValue(form.name)}
              className='absolute right-[6px] top-1/2 z-10 -translate-y-1/2 transform transition-all hover:opacity-70'
              type='button'
            >
              <Image src={IcClose} alt='IcClose' draggable={false} />
            </button>
          </div>

          {errors[form.name] && <div className='mt-1 text-[12px] text-red-500'>{errors[form.name]?.message}</div>}
        </div>

        <div>
          <label htmlFor={'quizzes' + id} className='text-[14px] text-[#A5A5B5]'>
            Id&apos;s Quizzes on-chain is...
          </label>
          <div className='relative mt-2'>
            <input
              id={'quizzes' + id}
              {...register(form.quizzes)}
              type='text'
              placeholder='Enter quiz ID'
              className='w-full rounded-[8px] border border-[#E3E3E3] bg-[#F2F2F2] p-2 text-[16px] font-semibold focus:outline-none'
            />
            <button
              onClick={() => handleClearValue(form.quizzes)}
              type='button'
              className='absolute right-[6px] top-1/2 z-10 -translate-y-1/2 transform transition-all hover:opacity-70'
            >
              <Image src={IcClose} alt='IcClose' draggable={false} />
            </button>
          </div>

          {errors[form.quizzes] && <div className='mt-1 text-[12px] text-red-500'>{errors[form.quizzes]?.message}</div>}
        </div>

        <MainButton disabled={loading} type='submit' className='mt-6'>
          {loading ? 'Starting...' : 'Start'}
        </MainButton>
      </form>
    </CenterContainerModal>
  )
}

export default JoinQuizzesModal

const Title = () => {
  return (
    <div className='flex items-center gap-3'>
      <Image src={Logo} alt='Logo' draggable={false} />
      <div className='flex-1'>
        <div className='text-[14px] text-[#A5A5B5]'>Quizzes on-chain</div>
        <div className='text-[16px] font-bold text-[#18191B]'>Hydra Quizzes on-chain </div>
      </div>
    </div>
  )
}
