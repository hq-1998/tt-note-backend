const joi = require('joi');

const account = joi.string().min(11).max(11).required();

// password 和 code 互斥
const code = joi.string().pattern(/^\d{6}$/);
const password = joi.string().pattern(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*()_"'+,-./:;<=>?[_\]{|}~\\]+$)[a-zA-Z\d!@#$%^&*()_"'+,-./:;<=>?[_\]`{|}~\\]+$/)

const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const avatar = joi.string().dataUri().required();
const type = joi.number().integer().min(1).max(2).required();

exports.register_login_schema = joi.alternatives([{
    type,
    account,
    password,
}, {
    type,
    account,
    code
}])

exports.send_code_schema = joi.object({
    account
})

exports.get_user_info_schema = joi.object({
    userId: id
})

exports.reset_password_schema = joi.object({
    account,
    newPassword: password,
    code
})

exports.update_userInfo_schema = joi.object({
    id,
    nickname,
    email,
    avatar
})