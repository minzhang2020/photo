const axios = require('axios')
const logger = require('./logger')('service')
var instance = axios.create({
  baseURL: 'http://172.105.210.121:8880/api',
  timeout: 1000
})
instance.interceptors.response.use(
  response => {
    let status = response.status
    if (status === 200) {
      let resData = response.data
      if (resData != null) {
        return resData
      }
    }
    return {
      retcode: -99999,
      msg: '服务器异常'
    }
  },
  error => {
    if (error) {
      console.log(error)
    }
    return Promise.reject(error)
  }
)
module.exports = {
  async getCategories() {
    logger.info('获取categories')
    return instance.get('/material/categories')
  }
}
