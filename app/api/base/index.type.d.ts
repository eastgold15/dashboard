export * from './v1/auth.type'
export * from './v1/common.type'
export * from './v1/account.type'
export * from './v1/tool.type'
export * from './v1/cms.type'
export * from './v1/banner.type'
export * from './v1/aigc/chat.type'

export interface IRes {
  code: number
  data: any
  message: string
}

// 普通数据响应
export interface DataRes<T> extends IRes {
  data: T | null
}

// 分页数据模型
export interface PageModel<T> {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

// 分页数据响应
export interface PageRes<T> extends IRes {
  data: PageModel<T>
}
