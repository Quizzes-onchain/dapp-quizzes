'use client'
import LoginPage from '@/src/components/login'
import { useEffect, useState } from 'react'
import ChooseAccountType from '../components/choose-account-type'
import { getZkAccounts } from '../utils/local-storage'

export default function Home() {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    const userLogin = getZkAccounts()
    if (userLogin.length > 0) setLogin(true)
  }, [])

  return login ? <ChooseAccountType /> : <LoginPage />
}
