'use client'

import { ReactNode, Suspense } from 'react'
import ReduxProvider from './redux.provider'

import Loading from '@/src/app/loading'

const GeneralProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ReduxProvider>{children}</ReduxProvider>
    </Suspense>
  )
}

export default GeneralProvider
