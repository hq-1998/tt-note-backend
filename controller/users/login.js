const db = require('../../db');
const bcrypt = require('bcrypt');
const { jwtSecret, expiresIn, RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');
const jwt = require('jsonwebtoken');
const { omit } = require('lodash');

module.exports = async (ctx) => {
    let req = ctx.request;
    const data = req.body;
    const sqlStr = `select * from users where account=?`;
    const results = await db.sqlConnection(sqlStr, [data.account]);

    if (results.length === 0) {
        return responseClient(ctx, RES_CODE.dataFail, '该手机号不存在，请先注册');
    }

    const type = Number(data.type);
    if (type === 2) {
        const compareResult = bcrypt.compareSync(
            data.password,
            results[0].password
        )

        if (!compareResult) {
            return responseClient(ctx, RES_CODE.dataFail, '用户名或密码错误，请重试')
        }
    } else {
        const code = ctx.session.code;
        if (+data.code !== +code) {
            return responseClient(ctx, RES_CODE.dataFail, '验证码错误，请重试')
        }
    }

    const userInfo = omit(results[0], 'password')
    const tokenStr = jwt.sign(userInfo, jwtSecret, { expiresIn })

    const result = {
        userInfo,
        token: `Bearer ${tokenStr}`
    }

    responseClient(ctx, RES_CODE.reqSuccess, '登录成功', result)
}