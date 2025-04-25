import type { Order, PaginationParams } from '../index.type'
import { string } from 'vue-types'

// --------现在确定 一个增删改查的实体 因该有三个类型 ，应对不同新增 和 更新
// ---- 记住这个 xxxBase  xxxxModel  xxxxModelQuery
// 基础菜单类型（不含id，用于新增）
// ----------------------菜单
export interface IMenuBase {
  /**
   * 设置当前路由高亮的菜单项，一般用于详情页
   */
  activeMenu: string
  /**
   * 菜单路由路径或外链
   */
  component?: string
  /**
   * 外链打开方式
   */
  extOpenMode?: number
  /**
   * 菜单图标
   */
  icon?: string
  /**
   * 是否外链
   */
  isExt: boolean
  /**
   * 是否开启页面缓存
   */
  keepAlive?: number
  /**
   * 菜单或权限名称
   */
  name?: string
  /**
   * 排序
   */
  orderNo?: number
  /**
   * 父级菜单
   */
  parentId?: number
  /**
   * 前端路由地址
   */
  path?: string
  /**
   * 对应权限
   */
  permission?: string
  /**
   * 菜单是否显示
   */
  show?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 菜单类型
   */
  type?: number
}
// 完整菜单类型（包含id，用于查询/修改/删除）
export interface IMenuModel extends IMenuBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IMenuModelQuery extends IMenuModel, PaginationParams { }

// -----------------组织
export interface IOrgBase {
  /**
   * 组织地址
   */
  address?: string
  /**
   * 联系电话
   */
  contactPhone?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 组织Logo URL
   */
  logoUrl?: string
  /**
   * 组织名称
   */
  name: string
  /**
   * 组织状态: 1-启用, 0-禁用
   */
  status?: number
}
// 完整组织类型（包含id，用于查询/修改/删除）
export interface IOrgModel extends IOrgBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IOrgModelQuery extends IOrgModel, PaginationParams { }

// -----------------用户-------------------------

export interface IUserBase {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 归属大区
   */
  deptId?: number;
  /**
   * 邮箱
   */
  email?: string;
  field?: string;
  /**
   * 呢称
   */
  nickname?: string;
  order?: Order;
  /**
   * 所属组织
   */
  organizationId?: number;
  page?: number;
  pageSize?: number;
  /**
   * 登录密码
   */
  password?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * QQ
   */
  qq?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 归属角色
   */
  roleIds?: number[];
  /**
   * 状态
   */
  status?: number;
  /**
   * 登录账号
   */
  username?: string;
}

// 完整组织类型（包含id，用于查询/修改/删除）
export interface IUserModel extends IUserBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IUserModelQuery extends IUserModel, PaginationParams { }

// ----------------------角色

export interface IRoleBase {
  _t?: number
  field?: string
  /**
   * 关联菜单、权限编号
   */
  menuIds?: number[]
  /**
   * 角色名称
   */
  name?: string
  order?: Order
  page?: number
  pageSize?: number
  /**
   * 角色备注
   */
  remark?: string
  /**
   * 状态
   */
  status?: number
  /**
   * 角色值
   */
  value?: string

}

// 完整组织类型（包含id，用于查询/修改/删除）
export interface IRoleModel extends IRoleBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IRoleModelQuery extends IRoleModel, PaginationParams { }

// ----------------------部门

export interface IDeptBase {
  children?: IDeptBase[]
  createdAt: string
  creator: null | string
  name: string
  orderNo: number
  parent?: IDeptBase
  updatedAt: string
  updater: null | string
}
// 完整组织类型（包含id，用于查询/修改/删除）
export interface IDeptModel extends IDeptBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IDeptModelQuery extends IDeptModel, PaginationParams { }

// ----------------------地区
export interface Coordinates {
  lat: number
  lng: number
}
export interface IAreaBase {
  areaCode?: string
  areaName?: string
  areaType?: string
  children?: string[]
  coordinates?: Coordinates
  createdAt?: string
  level?: number
  updatedAt?: string
  [property: string]: any
}
// 完整组织类型（包含id，用于查询/修改/删除）
export interface IAreaModel extends IAreaBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IAreaModelQuery extends IAreaModel, PaginationParams { }

// ----------------------工单管理
export interface IOrderBase {
  createdAt: string
  faultDesc: string
  faultLevel: number
  faultLocation: string
  faultType: string
  orderId: string
  orderStatus: number
  updatedAt: string
}
// 完整组织类型（包含id，用于查询/修改/删除）
export interface IOrderModel extends IOrderBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IOrderModelQuery extends IOrderModel, PaginationParams { }

// ---------------------- 设备管理

export interface IDeviceBase {
  createdAt?: string
  deviceCode?: string
  deviceType?: number
  gatewayId?: null
  manufacturer?: string
  model?: null
  status?: number
  updatedAt?: string
}
// 完整组织类型（包含id，用于查询/修改/删除）
export interface IDeviceModel extends IDeviceBase {
  id: string
}
// 查询参数（继承完整类型，含分页）
export interface IDeviceModelQuery extends IDeviceModel, PaginationParams { }

// 系统监控
/**
 * ServeStatInfo
 */
export interface ServeStatInfo {
  /**
   * CPU信息
   */
  cpu: Cpu
  /**
   * 磁盘信息
   */
  disk: Disk
  /**
   * 内存信息
   */
  memory: Memory
  /**
   * 运行环境
   */
  runtime: Runtime
}

/**
 * CPU信息
 *
 * Cpu
 */
export interface Cpu {
  /**
   * 品牌
   */
  brand: string
  /**
   * cpu资源消耗
   */
  coresLoad: CoreLoad[]
  /**
   * 制造商
   */
  manufacturer: string
  /**
   * 型号
   */
  model: string
  /**
   * 物理核心数
   */
  physicalCores: number
  /**
   * CPU资源消耗 原始滴答
   */
  rawCurrentLoad: number
  /**
   * 空闲CPU资源 原始滴答
   */
  rawCurrentLoadIdle: number
  /**
   * 速度 in GHz
   */
  speed: number
}

/**
 * CoreLoad
 */
export interface CoreLoad {
  /**
   * 当前CPU资源消耗
   */
  rawLoad: number
  /**
   * 当前空闲CPU资源
   */
  rawLoadIdle: number
}

/**
 * 磁盘信息
 *
 * Disk
 */
export interface Disk {
  /**
   * 可用磁盘空间 (bytes)
   */
  available: number
  /**
   * 磁盘空间大小 (bytes)
   */
  size: number
  /**
   * 已使用磁盘空间 (bytes)
   */
  used: number
}

/**
 * 内存信息
 *
 * Memory
 */
export interface Memory {
  /**
   * 可用内存
   */
  available: number
  /**
   * total memory in bytes
   */
  total: number
}

/**
 * 运行环境
 *
 * Runtime
 */
export interface Runtime {
  /**
   * 服务器架构
   */
  arch: string
  /**
   * Node版本
   */
  nodeVersion: string
  /**
   * Npm版本
   */
  npmVersion: string
  /**
   * 系统
   */
  os: string
}

