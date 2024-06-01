'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/scss/main.scss'
import { Socket, io } from 'socket.io-client'
import Loading from '../app/loading'
import { QUESTION_FORM } from '../constant/questionForm.constant'
import { useAppDispatch } from '../hooks/appHook'
import { resetFormQuestion } from '../store/reducers/question-form.reducer'
import { setSocket } from '../store/reducers/socket.reducer'
import { getZkAccounts, setPreviousGame } from '../utils/local-storage'
import AnswerLayout from './answer-layout'
import BackdropLayout from './backdrop-layout'
import EmptyLayout from './empty-layout'
import LeaderBoardLayout from './leader-board-layout'
import MainLayout from './main-layout'
import UserLayout from './user-layout'

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true)

  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()

  const dispatch = useAppDispatch()

  const page = useMemo(() => {
    const backdropPages = ['/', '/login', '/choose-account-type']
    const mainPages = ['/share-quizzes', '/point-chart', '/home', '/start-game']
    const leaderBoardPage = ['/leader-board']
    const userPages = ['']
    const answerPage = ['/score-board', '/answer-question']

    if (backdropPages.includes(pathname)) return <BackdropLayout>{children}</BackdropLayout>
    if (mainPages.includes(pathname)) return <MainLayout>{children}</MainLayout>
    if (userPages.includes(pathname)) return <UserLayout>{children}</UserLayout>
    if (answerPage.includes(pathname)) return <AnswerLayout>{children}</AnswerLayout>
    if (leaderBoardPage.includes(pathname)) return <LeaderBoardLayout>{children}</LeaderBoardLayout>
    else return <EmptyLayout>{children}</EmptyLayout>
  }, [pathname, children])

  useEffect(() => {
    if (pathname !== '/') {
      if (pathname === '/leader-board' && params.get('pin')) {
        const previousGameUrl = '/leader-board' + '?pin=' + params.get('pin')
        setPreviousGame(previousGameUrl)
      }
      const userLogin = getZkAccounts()
      if (userLogin.length == 0) {
        router.push('/')
      } else setIsChecking(false)
    } else setIsChecking(false)
  }, [params, pathname, router])

  useEffect(() => {
    if (!pathname.includes('create-quizzes') && !pathname.includes('created-questions-preview')) {
      localStorage.removeItem(QUESTION_FORM)
      dispatch(resetFormQuestion())
    }
  }, [pathname, dispatch])

  useEffect(() => {
    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_HOST || '', {
      path: process.env.NEXT_PUBLIC_SOCKET_HOST_PATH,
    })

    dispatch(setSocket(socket))

    return () => {
      socket.disconnect()
    }
  }, [dispatch])

  return (
    <>
      <div className='flex h-dvh w-screen justify-center overflow-hidden bg-violet-50 backdrop-blur'>
        {!isChecking && <div className='w-full max-w-[414px] bg-white'>{page}</div>}

        {isChecking && (
          <div className='w-full max-w-[414px] bg-white'>
            <BackdropLayout>
              <Loading />
            </BackdropLayout>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  )
}

export default Layout
