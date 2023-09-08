const router = require('../utils/swagger')
const { publicPath } = require('../config/constant')

router.prefix(`${publicPath}/users`)

const { login, register, sendLoginCode, resetPassword, sendResetPasswordCode, getUserInfo } = require('../controller/users')

const koaJoi = require('../validator')

const {
  register_login_schema,
  send_code_schema,
  reset_password_schema,
  get_user_info_schema
} = require('../validator/user')

router.post('/login', koaJoi('post', register_login_schema), login)
router.post('/register', koaJoi('post', register_login_schema), register)
router.post('/sendLoginCode', koaJoi('post', send_code_schema), sendLoginCode)
router.post('/sendResetPasswordCode', koaJoi('post', send_code_schema), sendResetPasswordCode)
router.post('/resetPassword', koaJoi('post', reset_password_schema), resetPassword)
router.get('/getUserInfo', koaJoi('get', get_user_info_schema), getUserInfo)
// router.post('/updateInfo', updateUserInfo)
// router.post('/update/avatar', updateAvatar)

module.exports = router
