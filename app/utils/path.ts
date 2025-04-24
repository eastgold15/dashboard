/**
 *
 * /dashboard     对/dashboard有效   \
 * /dashboard/*  只对/dashboard/ 和/dashboard/*  有效
 * @param path
 * @returns
 *
 */
export function pathToRegExp(path: string) {
  const pattern = path.replace(/\//g, '\/').replace(/\*/g, '.*')
  return new RegExp(`^${pattern}$`) // 将路径转换为正则表达式
}
