const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * @description Promise 化
 * @param { Object } api
 */
const promisify = api => {
  return (options, ...params) => {
      return new Promise((resolve, reject) => {
          api(Object.assign({}, options, { success: resolve, fail: reject }), ...params)
      })
  }
}

module.exports = {
  formatTime
}
