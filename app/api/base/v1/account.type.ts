/**
 * AccountInfo
 */

export interface AccountInfo {
  /**
   * 头像
   */
  avatar: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 手机号
   */
  phone: string
  /**
   * 备注
   */
  remark: string
  /**
   * 用户名
   */
  username: string
  createdAt: string
  id: number
  qq: string
  roles: Role[]
  status: number
  updatedAt: string

  [property: string]: any
}

export interface Role {
  createdAt?: string
  creator?: string
  default?: null
  id?: number
  name?: string
  remark?: string
  status?: number
  updatedAt?: string
  updater?: string
  value?: string
  [property: string]: any
}

export interface NestedMenu {
  children: NestedMenu[]
  component: null | string
  id: number
  meta: Meta
  name: string
  path: string
  redirect: string
  [property: string]: any
}
export interface Meta {
  activeMenu: null | string
  extOpenMode: number
  icon: string
  isExt: boolean
  keepAlive: number
  orderNo: number
  show: number
  status: number
  title: string
  type: number
  [property: string]: any
}
