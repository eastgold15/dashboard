export function pathToRegExp(path: string) {
  const pattern = path.replace(/\//g, '\/').replace(/\*/g, '.*')
  return new RegExp(`^${pattern}$`) // 将路径转换为正则表达式
}
