const joi = require('joi');

const account = joi.string().min(11).max(11).required();

// password 和 code 互斥
const code = joi.string().pattern(/^\d{6}$/);
const password = joi.string().pattern(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*()_"'+,-./:;<=>?[_\]{|}~\\]+$)[a-zA-Z\d!@#$%^&*()_"'+,-./:;<=>?[_\]`{|}~\\]+$/)

const id = joi.number().integer().min(1).required();
const nickName = joi.string().min(1).max(16).required();
const signature = joi.string().min(0).max(30).optional();
const avatar = joi.string().optional();
const province = joi.number().integer().required();
const city = joi.number().integer().required();
const gender = joi.number().integer().min(0).max(2).required();
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
    nickName,
    gender,
    signature,
    province,
    city,
    avatar
})