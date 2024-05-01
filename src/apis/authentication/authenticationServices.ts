import router from '@/router'
import { axios } from '@/http/axios'
import {
  destroySensitiveInfo,
  getDeviceId,
  getRefreshToken,
  saveToken
} from '@/services/localStorage'
import type { RefreshTokenRequest, RefreshTokenResponse } from './authenticationTypes'
import { APP_ROUTES } from '@/constants'

export const refreshToken = async (): Promise<string | undefined> => {
  try {
    if (getRefreshToken() && getDeviceId()) {
      const data: RefreshTokenRequest = {
        refreshToken: getRefreshToken() ?? ''
      }

      const res = await axios.post<ResponseSuccess<RefreshTokenResponse>>(
        '/api/v1/oauth2/refresh-token',
        data,
        {
          headers: {
            'Device-Id': getDeviceId()
          }
        }
      )
      const { accessToken, refreshToken, expiresAt, deviceId } = res.data?.data ?? {}
      saveToken(accessToken, refreshToken, expiresAt, deviceId)
      // TODO: display dialog session expired
      return 'Successfully'
    }

    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  } catch (error: any) {
    // TODO: display dialog session expired
    destroySensitiveInfo()
    router.push({ name: APP_ROUTES.LOGIN.name })
  }
}
