export const getLocalDateTime = () => {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  const localDateTime = new Date(now.getTime() - offset * 60 * 1000)
  return localDateTime.toISOString().slice(0, 16)
}
