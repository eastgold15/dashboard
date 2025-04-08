import type { DataRes } from '../index.type'
import type { ImageCaptcha, LoginToken } from './auth.type'

export default {
  // 密码登录
  async login(options: any) {
    return await useAPI.post<LoginToken, DataRes<LoginToken>>('/auth/login', options)
  },

  // 验证码
  async getCaptcha() {
    return await useAPI.get<any, DataRes<ImageCaptcha>>('/auth/captcha/img')

  },


}
