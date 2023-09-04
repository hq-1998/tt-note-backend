const koaJwt = require('koa-jwt');
const { jwtSecret } = require('../config/constant');

module.exports = () => koaJwt({
    secret: jwtSecret,
    algorithm: ['HS256'],
    credentialsRequired: true,
})
    // .unless({
    //     path: [
    //         '/login',
    //         '/register'
    //     ]
    // })