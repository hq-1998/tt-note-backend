const router = require('koa-router')()
const path = require('path')

const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    info: {
        title: 'koa服务端API',
        version: '1.0.0',
        description: 'koa服务端API接口文档'
    },
    host: 'localhost:3000', // 接口文档访问地址为：localhost:3000/swagger
    basePath: '/' // Base path (optional)
}

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/users.js')]
}

const swaggerSpec = swaggerJSDoc(options)

router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
})

module.exports = router