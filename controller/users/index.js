const login = require('./login');
const register = require('./register');
const sendLoginCode = require('./sendLoginCode');
const resetPassword = require('./resetPassword')
const sendResetPasswordCode = require('./sendResetPasswordCode')
const getUserInfo = require('./getUserInfo');
const updateUserInfo = require('./updateUserInfo');

module.exports = {
    login,
    register,
    sendLoginCode,
    resetPassword,
    sendResetPasswordCode,
    getUserInfo,
    updateUserInfo
}