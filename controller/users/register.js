const db = require('../../db');
const bcrypt = require('bcrypt');
const { RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');

module.exports = async (ctx) => {
    let req = ctx.request;
    const userInfo = req.body;
    const sqlStr = `select * from users where account=?`;

    const results = await db.sqlConnection(sqlStr, [userInfo.account]);

    if (results.length > 0) {
        return responseClient(ctx, RES_CODE.dataFail, '该手机号已存在，请更换其他手机号');
    }

    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    const sql = `insert into users set ?`;

    const res = await db.sqlConnection(sql, {
        account: userInfo.account,
        password: userInfo.password
    })

    if (res.affectedRows !== 1) {
        return responseClient(ctx, RES_CODE.dataFail, '注册失败，请稍后再试');
    }

    responseClient(ctx, RES_CODE.reqSuccess, '注册成功');
}