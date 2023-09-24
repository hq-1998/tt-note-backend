const Router = require('koa-router');
const uploadController = require('../controller/upload/index');

const router = new Router();

router.post('/upload', uploadController.uploadFile);
router.post('/upload/bigFile', uploadController.uploadBigFile);

module.exports = router;