const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')
const cors = require("koa2-cors");
const { koaSwagger } = require('koa2-swagger-ui')
const config = require('./config/constant')
const websocket = require('./websocket')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
// const jwtAuth = require('./utils/jwt')

const routes = require('./routes')
const responseClient = require('./utils/responseClient')
const { RES_CODE } = require('./config/constant')

// error handler
onerror(app)

// middlewares
app.use(koaBody.default({enableTypes:['json', 'form', 'text'], multipart: true}))
app.use(cors({
  credentials: true
}))
// app.use(jwtAuth())
app.use(json())
app.use(logger())
app.keys = ['xtbj'];
app.use(session(config.sessionConfig, app))
app.use(require('koa-static')(__dirname + '/public'))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))

routes(app)

websocket.init();

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  responseClient(ctx, RES_CODE.dataFail, err)
});

module.exports = app
