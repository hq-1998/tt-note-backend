const Router = require('koa-router');
const areaController = require('../controller/area/index');
const { get_city_schema } = require('../validator/area/index');

const router = new Router({ prefix: '/area' });

const koaJoi = require('../validator')

router.get('/getProvince', areaController.getProvince);
router.get('/getCityByPid', koaJoi('get', get_city_schema), areaController.getCity);

module.exports = router;