'use client'

import AustronautIcon from '@/public/assets/icons/common/astronaut.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import facebookIcon from '@/public/assets/icons/auth/facebook.svg'
import googleIcon from '@/public/assets/icons/auth/google.svg'
import twitchIcon from '@/public/assets/icons/auth/twitch.svg'
import { useRouter } from 'next/navigation'

import { authServices } from '@/src/store/services/auth.service'
import { TZkAccount } from '@/src/types/global'
import { clearZkSetup, getPreviousGameUrl, getZkAccounts, getZkSetup } from '@/src/utils/local-storage'
import { Modal } from '@polymedia/webutils'
import { toast } from 'react-toastify'

const Login = () => {
  const router = useRouter()

  const accounts = useRef<TZkAccount[]>(getZkAccounts()) // useRef() instead of useState() because of setInterval()
  const [modalContent, setModalContent] = useState<string>('')

  useEffect(() => {
    const handleCompleteZkLogin = async () => {
      try {
        if (getZkSetup()) setModalContent('Logging. This can take a few seconds...')
        const loginSuccess = await authServices.completeZkLogin(accounts)

        const previousGameUrl = getPreviousGameUrl()

        if (loginSuccess && !previousGameUrl) router.push('/choose-account-type')
        else if (loginSuccess && previousGameUrl) router.push(previousGameUrl)
        else {
          clearZkSetup()
          setModalContent('')
        }
      } catch (error) {
        clearZkSetup()
        setModalContent('')
        toast.error('Login failed. Please try again...')
      }
    }

    handleCompleteZkLogin()
  }, [router])

  return (
    <div className='no-scrollbar flex h-full flex-col gap-8 overflow-x-hidden p-4 animate-fade-up'>
      <Modal content={modalContent} styleContent={{ maxWidth: '414px', width: 'full', overflow: 'hidden' }} />
      <div className='w-full rounded-3xl'>
        <Image className='h-full w-full rounded-3xl' src={AustronautIcon} alt='clock' />
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-center text-2xl font-bold leading-[30px] text-[#191919]'>Welcome to Quizzes on-chain</h1>

        <p className='bg-gradient-to-r from-[#00C4FF] to-[#0099FF] bg-clip-text text-center text-base font-normal leading-5 text-[transparent]'>
          Create, Share, and Play games wherever you go
        </p>
      </div>

      <div className='flex flex-col items-center justify-center gap-2'>
        <button
          className='hover:opacity-75 flex items-center justify-center gap-3 border-[#E3E3E3] border-[1px] py-3 px-4 w-full rounded-lg'
          onClick={() => {
            authServices.beginZkLogin('Facebook')
          }}
        >
          <Image className='size-6' src={facebookIcon} alt='facebook' />
          <p className='text-[#262626] text-sm'>Sign in with Facebook</p>
        </button>
        <button
          className='hover:opacity-75 flex items-center justify-center gap-3 border-[#E3E3E3] border-[1px] py-3 px-4 w-full rounded-lg'
          onClick={() => {
            authServices.beginZkLogin('Google')
          }}
        >
          <Image className='size-6' src={googleIcon} alt='google' />
          <p className='text-[#262626] text-sm'>Sign in with Google</p>
        </button>

        <button
          className='hover:opacity-75 flex items-center justify-center gap-3 border-[#E3E3E3] border-[1px] py-3 px-4 w-full rounded-lg'
          onClick={() => {
            authServices.beginZkLogin('Twitch')
          }}
        >
          <Image className='size-6' src={twitchIcon} alt='twitch' />
          <p className='text-[#262626] text-sm'>Sign in with Twitch</p>
        </button>
      </div>
    </div>
  )
}

export default Login
