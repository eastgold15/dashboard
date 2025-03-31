/**
 * ImageCaptcha
 */
export interface ImageCaptcha {
  /**
   * 验证码对应的唯一ID
   */
  id: string
  /**
   * base64格式的svg图片
   */
  img: string
  [property: string]: any
}

/**
 * LoginToken
 */
export interface LoginToken {
  /**
   * JWT身份Token
   */
  accessToken: string
  /**
   * JWT刷新Token
   */
  refreshToken: string
}
/**
 * LoginDto
 */
export interface LoginDto {
  /**
   * 验证码标识
   */
  captchaId: string
  /**
   * 密码
   */
  password: string
  /**
   * 手机号/邮箱
   */
  username: string
  /**
   * 用户输入的验证码
   */
  verifyCode: string
  [property: string]: any
}

export enum HttpMethod {
  GET,
  HEAD,
  PATCH,
  POST,
  PUT, DELETE, CONNECT, OPTIONS, TRACE, get, head, patch, post, put, delete, connect, options, trace,
}
