const router = require('../utils/swagger')

router.prefix('/users')

const { login, register, sendLoginCode, resetPassword } = require('../controller/users')

const koaJoi = require('../validator')

const {
  register_login_schema,
  send_code_schema,
  reset_password_schema
} = require('../validator/user')

router.post('/login', koaJoi('post', register_login_schema), login)
router.post('/register', koaJoi('post', register_login_schema), register)
router.post('/sendLoginCode', koaJoi('post', send_code_schema), sendLoginCode)
router.post('/resetPassword', koaJoi('post', reset_password_schema), resetPassword)
// router.get('/userinfo', getUserInfo)
// router.post('/updateInfo', updateUserInfo)
// router.post('/update/avatar', updateAvatar)

module.exports = router
