const Router = require('koa-router');

const router = new Router({ prefix: '/users' })

const { login, register, sendLoginCode, updateUserInfo, resetPassword, sendResetPasswordCode, getUserInfo, sendRegisterCode } = require('../controller/users')

const koaJoi = require('../validator')

const {
  register_login_schema,
  send_code_schema,
  reset_password_schema,
  get_user_info_schema,
  update_userInfo_schema
} = require('../validator/user')

router.post('/login', koaJoi('post', register_login_schema), login)
router.post('/register', koaJoi('post', register_login_schema), register)
router.post('/sendLoginCode', koaJoi('post', send_code_schema), sendLoginCode)
router.post('/sendResetPasswordCode', koaJoi('post', send_code_schema), sendResetPasswordCode)
router.post('/sendRegisterCode', koaJoi('post', send_code_schema), sendRegisterCode)
router.post('/resetPassword', koaJoi('post', reset_password_schema), resetPassword)
router.get('/getUserInfo', koaJoi('get', get_user_info_schema), getUserInfo)
router.post('/updateUserInfo', koaJoi('post', update_userInfo_schema), updateUserInfo)

module.exports = router
