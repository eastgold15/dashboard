
import type { ILoginToken } from './auth.type'

export default {
  serverStatus() {
    return Get('auth/status')
  },
  renewToken() {
    return Get('auth/renew_token') as Promise<IDataResponse<ILoginToken>>
  },
}
