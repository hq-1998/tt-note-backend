module.exports = (ctx, err_code, message, data) => {
    ctx.body = {
        code: err_code,
        message,
        data
    }
}