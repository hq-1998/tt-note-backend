const { RES_CODE } = require('../../config/constant');
const responseClient = require('../../utils/responseClient');

const randomCode = () => {
    let code = '' + (parseInt(Math.random() * 1000000) + 1000000);
    code = code.substring(0, 6);
    return +code;
}

// const codeReg = /^\d{6}$/;
const mobileReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

module.exports = async (ctx) => {
    let req = ctx.request;
    const data = req.body;

    if (!mobileReg.test(data.account)) {
        return responseClient(ctx, RES_CODE.dataFail, '手机号格式不正确');
    }

    // if (!codeReg.test(data.code)) {
    //     return responseClient(ctx, RES_CODE.dataFail, '验证码格式不正确');
    // }

    const code = randomCode();
    ctx.session.resetPasswordCode = code;
    responseClient(ctx, RES_CODE.reqSuccess, '发送成功', code);
}