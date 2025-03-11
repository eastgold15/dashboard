import type { AppCustomRouteRecordRaw } from '~~/types/router'
import type { IDataResponse } from '../index.type'
import type { ProfileType } from './login.type'
import { GetApi } from '../api'

interface RoleParams {
  roleName: string
}

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

  loginApi(data: UserType): Promise<IDataResponse<TokenType>> {
    return GetApi('/auth/login', { query: data }) as Promise<IDataResponse<TokenType>>
  },
  loginOutApi(): Promise<IDataResponse<null>> {
    return GetApi('user/loginOut') as Promise<IDataResponse<null>>
  },
  getUserInfoApi(): Promise<IDataResponse<ProfileType>> {
    return GetApi('/account/profile') as Promise<IDataResponse<ProfileType>>
  },
  getUserMenuInfoAPi(): Promise<AppCustomRouteRecordRaw[]> {
    return GetApi('/account/menus') as Promise<AppCustomRouteRecordRaw[]>
  },
  getAdminRoleApi(params: RoleParams): Promise<AppCustomRouteRecordRaw[]> {
    return GetApi('/role/list', { query: params }) as Promise<AppCustomRouteRecordRaw[]>
  },

}
