import path from 'path'
export function handleBase64Image(base64: string | undefined) {
  if (!base64) return
  const isImage = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(base64)
  return isImage
    ? base64
    : path.resolve(__dirname, `../../assets/svg/Error 429.svg`)
}
