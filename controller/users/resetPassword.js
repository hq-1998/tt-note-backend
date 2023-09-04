const { RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');
const bcrypt = require('crypto');

const codeReg = /^\d{6}$/;
const mobileReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const passwordReg = 
/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*()_"'+,-./:;<=>?[_\]{|}~\\]+$)[a-zA-Z\d!@#$%^&*()_"'+,-./:;<=>?[_\]`{|}~\\]+$/;

module.exports = async (ctx) => {
    let req = ctx.request;
    const data = req.body;

    if (!mobileReg.test(data.account)) {
        return responseClient(ctx, RES_CODE.dataFail, '手机号格式不正确');
    }

    if (!passwordReg.test(data.newPassword)) {
        return responseClient(ctx, RES_CODE.dataFail, '密码格式不正确，仅支持英文数字至少包含两种字符类型');
    }

    if (!codeReg.test(data.code)) {
        return responseClient(ctx, RES_CODE.dataFail, '验证码格式不正确');
    }

    const sqlStr = `select * from users where account=?`;

    const results = await db.sqlConnection(sqlStr, [data.account]);

    if (results.length === 0) {
        return responseClient(ctx, RES_CODE.dataFail, '该手机号不存在');
    }

    const sessionCode = ctx.session.resetCode;

    if (+data.code !== +sessionCode) {
        return responseClient(ctx, RES_CODE.dataFail, '验证码错误，请重试')
    }

    // 更新users密码
    const updatePasswordSql = `update users set password=? where account=?`;
    const newBcryptPassword = bcrypt.hashSync(data.newPassword, 10);

    const updateResult = await db.sqlConnection(updatePasswordSql, [newBcryptPassword, data.account]);

    if (updateResult.affectedRows !== 1) {
        responseClient(ctx, RES_CODE.reqSuccess, '修改成功');
    } else {
        responseClient(ctx, RES_CODE.dataFail, '修改失败');
    }
}