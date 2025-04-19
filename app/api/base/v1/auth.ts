import type { $API, DataRes } from '../index.type'
import type { ImageCaptcha, LoginToken } from './auth.type'




const createAuthApi = ($api: $API) => ({
  // 密码登录
  async login(options: any) {
    return await $api.post<DataRes<LoginToken>>('/auth/login', options)
  },
  // 验证码
  async getCaptcha() {
    return await useAPI<DataRes<ImageCaptcha>>('/auth/captcha/img'
    )
  }
})

const { $api } = useNuxtApp()
export const authApi = createAuthApi($api)
