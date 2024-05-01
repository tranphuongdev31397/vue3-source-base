export type Authentication = {
  accessToken: string
  refreshToken: string
  expiresAt: string
  deviceId: string
}

export type LoginRequest = {
  username: string
  password: string
  grantType: 'password'
  clientId: string
  clientSecret: string
  encryptedAesKey: string
}

export type LoginResponse = Authentication & {
  userId: string
}

export type RefreshTokenRequest = {
  // grantType: 'refresh_token'
  // clientId: string
  // clientSecret: string
  refreshToken: string
}

export type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
  expiresAt: string
  deviceId: string
}
