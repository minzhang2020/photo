const axios = require('axios')
const logger = require('./logger')('service')
var instance = axios.create({
  baseURL: 'http://172.105.210.121:8880/api',
  timeout: 30000
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
    return null
  },
  error => {
    return Promise.reject(error)
  }
)
module.exports = {
  async getCategories() {
    logger.info('获取categories')
    return instance.get('/material/categories')
  },
  async getImagesByCategoryId(id, pageIndex = 1, pageSize = 20) {
    logger.info('material/pictures')
    return instance.get('material/pictures/' + id, {
      params: {
        page: pageIndex,
        per_page: pageSize
      }
    })
  }
}
