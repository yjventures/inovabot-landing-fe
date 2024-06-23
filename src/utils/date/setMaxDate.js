export const setMaxDate = (maxYear = 0) => {
  const today = new Date()
  const year = today.getFullYear()
  let month = today.getMonth() + 1
  let day = today.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return `${year - maxYear}-${month}-${day}`
}
