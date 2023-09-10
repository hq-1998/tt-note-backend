const db = require("../../db");
const responseClient = require("../../utils/responseClient");
const { RES_CODE } = require("../../config/constant");

class AreaController {
  async getProvince(ctx) {
    const sqlStr = `select * from province`;
    const result = await db.sqlConnection(sqlStr);
    responseClient(ctx, RES_CODE.reqSuccess, "查询成功", result);
  }
  async getCity(ctx) {
    const { pid } = ctx.request.query;
    const sqlStr = `select * from city where pid=${pid}`;
    const result = await db.sqlConnection(sqlStr);
    responseClient(ctx, RES_CODE.reqSuccess, "查询成功", result);
  }
}

module.exports = new AreaController();
