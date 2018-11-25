const Router = require('koa-router')
const router = new Router()
const logger = require('./logger.js')('router')
const cache = require('./cache')
const services = require('./services')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    url: ctx.request.path || '/'
  })
})

router.get('/notfound', async (ctx, next) => {
  await ctx.render('404')
})

router.get('/design', async (ctx, next) => {
  let list = await cache.getCategoryByKey('3')
  await ctx.render('design', {
    url: ctx.request.path,
    menuList: list
  })
})

router.get('/photo', async (ctx, next) => {
  let list = await cache.getCategoryByKey('2')
  await ctx.render('photo', {
    url: ctx.request.path,
    menuList: list
  })
})

router.get('/media', async (ctx, next) => {
  let list = await cache.getCategoryByKey('1')
  await ctx.render('media', {
    url: ctx.request.path,
    menuList: list
  })
})

router.get('/list/:id', async (ctx, next) => {
  if (ctx.params.id) {
    let pageIndex = ctx.request.query.page || 1
    let data = await services.getImagesByCategoryId(ctx.params.id, pageIndex)
    if (data !== null) {
      return await ctx.render('list', {
        data
      })
    }
    ctx.redirect('/notfound')
  }
  ctx.redirect('/notfound')
})

module.exports = router
