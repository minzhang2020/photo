const Koa = require('koa')
const koaCompress = require('koa-compress')
const compressible = require('compressible')
const static = require('koa-static')
const app = new Koa()
const views = require('koa-views')
const router = require('./router')
const path = require('path')
const logger = require('./logger.js')('index')
const cache = require('./cache')

app.use(async (ctx, next) => {
  logger.info(`${ctx.method} ${ctx.url}`)
  await next()
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  logger.info(`${ctx.method} ${ctx.url} 耗时 ${ms}毫秒`)
})
//压缩
app.use(
  koaCompress({
    // 压缩数据
    filter: type => !/event\-stream/i.test(type) && compressible(type) // eslint-disable-line
  })
)
//设置静态资源
app.use(
  static(path.join(__dirname, '../web/'), {
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
)

//视图解析
app.use(views(path.join(__dirname, '../web/views'), { extension: 'pug' }))

app.use(router.routes()).use(router.allowedMethods())

app.on('error', err => {
  logger.error('server error', err)
})
cache.init()
app.listen(3000)
