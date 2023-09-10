const { RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');
const db = require('../../db')

module.exports = async (ctx) => {
    let req = ctx.request;
    const data = req.body;

    const { nickName, gender, signature, province, city, id, avatar } = data;
    let sql = 'update users set gender = ?, province = ?, city = ?, ';
    let values = [gender, province, city];

    if (nickName) {
        sql += 'nickName = ?, ';
        values.push(nickName);
    }

    if (signature) {
        sql += 'signature = ?, ';
        values.push(signature);
    }

    if (avatar) {
        sql += 'avatar = ?, ';
        values.push(avatar);
    }

    sql = sql.slice(0, -2);
    sql += ' where id = ?';
    values.push(id);
    await db.sqlConnection(sql, values);
    responseClient(ctx, RES_CODE.reqSuccess, '修改成功');
}