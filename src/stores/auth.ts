import { Authentication } from '@/constants'
import { defineStore, acceptHMRUpdate } from 'pinia'

interface IUser {
  email: string
  name: string
}

interface IToken {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref<boolean>(false)
  const info = ref<IUser | null>(null)
  const tokens = ref<IToken | null>(null)

  const setInfo = (user: IUser) => {
    info.value = user
  }

  const setIsLoggedIn = (statusLogin: boolean) => {
    isLoggedIn.value = statusLogin
  }
  const accessToken = useLocalStorage<string | null>(Authentication.AccessToken, null)
  const setTokens = (token: IToken) => {
    tokens.value = token
    // Set Local Storage
    accessToken.value = token.accessToken
  }

  const clearStore = () => {
    isLoggedIn.value = false
    info.value = null
    tokens.value = null
    accessToken.value = null
  }

  return {
    isLoggedIn,
    info,
    setInfo,
    setIsLoggedIn,
    setTokens,
    clearStore
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
