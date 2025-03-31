import type { DataRes } from '../index.type'
import type { ImageCaptcha, LoginToken } from './auth.type'

export default {
  // 密码登录
  async login(options: any) {
    return  await useAPI<DataRes<LoginToken>>('/auth/login', options)

  },

  // 验证码
  async getCaptcha() {
    return await useAPI<DataRes<ImageCaptcha>>('/auth/captcha/img')
 
  },

  /*  renewToken() {
     return Get('auth/renew_token') as Promise<IDataResponse<ILoginToken>>
   }, */
}
