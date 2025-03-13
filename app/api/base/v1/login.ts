import type { DataRes } from '../index.type'
import type { ProfileType } from './login.type'
import { GetApi } from '../api'

export interface UserType {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
}
export interface TokenType {
  accessToken: string
  refreshToken: string
}
export default {

  loginApi(data: UserType): Promise<DataRes<TokenType>> {
    return GetApi('/auth/login', { query: data }) as Promise<DataRes<TokenType>>
  },
  loginOutApi(): Promise<DataRes<null>> {
    return GetApi('user/loginOut') as Promise<DataRes<null>>
  },
  getUserInfoApi(): Promise<DataRes<ProfileType>> {
    return GetApi('/account/profile') as Promise<DataRes<ProfileType>>
  },
  // getUserMenuInfoAPi(): Promise<AppCustomRouteRecordRaw[]> {
  //   return GetApi('/account/menus') as Promise<AppCustomRouteRecordRaw[]>
  // },
  // getAdminRoleApi(params: RoleParams): Promise<AppCustomRouteRecordRaw[]> {
  //   return GetApi('/role/list', { query: params }) as Promise<AppCustomRouteRecordRaw[]>
  // },

}
