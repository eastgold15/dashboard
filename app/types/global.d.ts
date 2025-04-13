declare global {
  interface Fn<T = any> {
    (...arg: T[]): T
  }

  type Nullable<T> = T | null

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  type ComponentRef<T> = InstanceType<T>

  type LocaleType = 'zh-CN' | 'en'
  // 用于快速生成与输入类型 T 结构相同的对象类型
  type QueryDataType<T> = { [key in keyof T]: T[key] }

  // 定义任何对象类型
  type AnyObject = Record<string, any>

  // 定义带有 id 属性的基础类型
  type WithId = { id: string | number }
  //
  /**
   * 定义分页 DTO 类型
   * @template T - 可选的额外属性类型
   */
  type PageDto<T = {}> = {
    page: number
    pageSize: number
  } & T

}


// 确保有导出空对象以触发模块扩充
export { }
