const services = require('./services.js')
const logger = require('./logger')('cache')
var LRU = require('lru-cache'),
  options = {
    max: 50,
    maxAge: 1000 * 60
  },
  cache = new LRU(options)

async function getCategories() {
  try {
    let categories = await services.getCategories()
    let ret = parseCategory(categories)
    if (ret !== null) {
      logger.info('获取categories成功')
      cache.set('category', ret)
    }
  } catch (error) {
    logger.error(error)
  }
}

function parseCategory(arr) {
  if (Array.isArray(arr) && arr.length > 0) {
    let ret = {}
    let menu = arr.filter(item => item.type === 1),
      parentCategory = arr.filter(item => item.type === 2),
      childCategory = arr.filter(item => item.type === 3)
    menu.forEach(item => {
      ret[item.id] = []
    })
    parentCategory.forEach(item => {
      let clone = { ...item }
      let child = childCategory.filter(childitem => {
        return childitem.parentid === item.id
      })
      clone.children = child
      ret[item.parentid].push(clone)
    })
    return ret
  }
  return null
}
module.exports = {
  init() {
    getCategories()
  },
  async getCategoryByKey(key) {
    if (cache.has('category')) {
      return cache.get('category')[key]
    } else {
      await getCategories()
      return cache.get('category')[key]
    }
  }
}
