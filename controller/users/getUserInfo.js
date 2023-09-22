const { RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');
const db = require('../../db');
const { omit } = require('lodash');
const globalWebSocket = require('../../websocket');

module.exports = async (ctx) => {
    let req = ctx.request;
    const data = req.query;

    const { userId } = data;
    if (!userId) {
        responseClient(ctx, RES_CODE.dataFail, '用户不存在');
        return;
    }

    const sqlStr = `select * from users where id = ?`;

    const res = await db.sqlConnection(sqlStr, {
        id: Number(userId),
    })

    console.log(res, '===res===')

    if (Array.isArray(res) && res.length > 0) {
        const result = res[0];
        globalWebSocket.sendToClient(result.id, {
            event: 'other',
            data: '查询个人信息成功'
        });

        const updateIsFirstLogin = `update users set isFirstLogin = 1 where id = ?`;
        if (!result.isFirstLogin) {
            await db.sqlConnection(updateIsFirstLogin, {
                id: userId
            })
        }
        responseClient(ctx, RES_CODE.reqSuccess, '查询成功', omit(result, 'password'));
        return;
    }
    responseClient(ctx, RES_CODE.dataFail, '查询失败')
}