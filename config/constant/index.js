const uuid = require('uuid');

module.exports = {
    jwtSecret: uuid.v4(),
    expiresIn: '24h',
    port: 3004,
    RES_CODE: {
        reqSuccess: 0,
        dataFail: -1,
    },
    sessionConfig: {
        key: uuid.v4(),
        maxAge: 60 * 1000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    },
    publicPath: env.NODE_ENV === 'dev' ? "": "/note"
}