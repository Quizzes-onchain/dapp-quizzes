import { TZkAccount, TZkSetup } from '../types/global'

const ACCESS_TOKEN = 'accessToken'
const REFRESH_TOKEN = 'refreshToken'
const ZK_SETUP = 'zkSetup'
const ZK_ACCOUNT = 'zkAccount'
const ROLE = 'role'
const PREVIOUS_GAME_URL = 'previousGameUrl'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}

export function setAccessToken(accessToken: string) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken)
  }
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN)
}

export function setRefreshToken(refreshToken: string) {
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

export function getZkSetup() {
  const dataRaw = localStorage.getItem(ZK_SETUP)
  if (!dataRaw) {
    return null
  }
  return JSON.parse(dataRaw)
}

export function setZkSetup(data: TZkSetup) {
  localStorage.setItem(ZK_SETUP, JSON.stringify(data))
}

export function clearZkSetup() {
  localStorage.removeItem(ZK_SETUP)
}

export function getZkAccounts(): TZkAccount[] {
  if (typeof window === 'undefined') return []
  const dataRaw = localStorage.getItem(ZK_ACCOUNT)
  if (!dataRaw) {
    return []
  }
  const data: TZkAccount[] = JSON.parse(dataRaw)
  return data
}

export function clearZkAccounts() {
  localStorage.removeItem(ZK_ACCOUNT)
}

export function setZkAccount(account: TZkAccount): void {
  if (typeof window === 'undefined') return
  let accounts = getZkAccounts()
  const newAccounts = [account, ...accounts]
  localStorage.setItem(ZK_ACCOUNT, JSON.stringify(newAccounts))
  accounts = newAccounts
}

export function setRole(role: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ROLE, role)
}

export function getRole() {
  if (typeof window === 'undefined') return ''
  const dataRaw = localStorage.getItem(ROLE)
  if (!dataRaw) {
    return ''
  }
  return dataRaw
}

export function clearRole() {
  localStorage.removeItem(ROLE)
}

export function setPreviousGame(url: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(PREVIOUS_GAME_URL, url)
}

export function getPreviousGameUrl() {
  if (typeof window === 'undefined') return ''
  const dataRaw = localStorage.getItem(PREVIOUS_GAME_URL)
  if (!dataRaw) {
    return ''
  }
  return dataRaw
}

export function clearPreviousGameUrl() {
  localStorage.removeItem(PREVIOUS_GAME_URL)
}
