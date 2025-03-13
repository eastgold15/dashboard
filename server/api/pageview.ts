const startAt = Date.now()
let count = 0
// 水水水水水水水水水水水水水
export default defineEventHandler(() => ({
  pageview: count++,
  startAt,
}))
