const login = require('./login');
const register = require('./register');
const sendLoginCode = require('./sendLoginCode');
const resetPassword = require('./resetPassword')

module.exports = {
    login,
    register,
    sendLoginCode,
    resetPassword
}