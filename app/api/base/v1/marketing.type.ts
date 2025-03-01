import type { SubscribeType } from '../index.type'



/**
 * 分组黑名单或白名单
 */
export enum BannerMode {
  WHITELIST,
  BLACKLIST,
}



export interface IBannerGroup extends Record<string, any> {
  id?: number

  name: string

  startAt?: Date

  endAt?: Date

  user_subscribe?: SubscribeType

  user_model?: BannerMode

  property?: string

  posters?: any[]
}

export interface IBannerGroupQuery extends IBannerGroup {
  page?: number
  pageSize?: number
}




export interface IUpdateBannerGroupDto extends IBannerGroup {
  /**
   * 横幅图片
   */
  posters: string[]
}

