module.exports = (date) => {
  let fmt = 'yyyy-MM-dd hh:mm:ss'
  const formatDate = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear())
  }
  for (let k in formatDate) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, formatDate[k].toString().length === 1 ? '0' + formatDate[k] : formatDate[k])
    }
  }
  return fmt;
}