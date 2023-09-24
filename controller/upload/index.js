const COS = require('cos-nodejs-sdk-v5');
const db = require('../../db');
const responseClient = require('../../utils/responseClient');
const { RES_CODE } = require('../../config/constant');
const fs = require('fs');
const path = require('path');
const { ensureDir, createReadStream, createWriteStream } = require('fs-extra')

const { SecretId, SecretKey, Bucket, Region } = process.env;

const cos = new COS({
    SecretId,
    SecretKey
})

class UploadController {
    async uploadFile(ctx) {
        try {
            const { fileType, userId } = ctx.request.body;
            const file = ctx.request.files.file;
            const bufferData = fs.readFileSync(file.filepath);
            const data = await cos.putObject({
                Bucket,
                Region,
                Key: `${userId}${new Date().getTime()}.${fileType}`,
                Body: bufferData,
                onProgress: function (progressData) {
                    console.log(progressData)
                }
            })

            const imageUrl = `https://${data.Location}`;
            console.log('上传图片的url为', imageUrl);

            const findSql = `select * from upload where userId = ?`;
            const findResult = await db.sqlConnection(findSql, [userId]);
            if (findResult.length) {
                const updateSql = `update upload set avatar = ?, fileType = ? where userId = ?`;
                await db.sqlConnection(updateSql, [imageUrl, fileType, userId]);
            } else {
                const sqlStr = `insert into upload(userId, avatar, fileType) values (?, ?, ?)`;
                await db.sqlConnection(sqlStr, [userId, imageUrl, fileType]);
            }
            responseClient(ctx, RES_CODE.reqSuccess, '上传成功', imageUrl);
        } catch (e) {
            console.log(e)
            responseClient(ctx, RES_CODE.dataFail, '上传失败');
        }
    }
    async uploadBigFile(ctx) {
        const { md5, fullname, index } = ctx.request.body;
        const file = ctx.request.files.file;
        const dir = path.join(process.cwd(), `/public/file/${md5}`);
        ensureDir(dir);
        const saveTo = path.join(dir, `${fullname}-${index}`);
        const readStream = createReadStream(file.filepath);
        const fileStream = createWriteStream(saveTo);
        responseClient(ctx, RES_CODE.reqSuccess, '分片上传成功', {
            index
        });
        readStream.pipe(fileStream);
        readStream.on('end', () => {
            responseClient(ctx, RES_CODE.reqSuccess, '分片上传成功', {
                index
            });
        })
        readStream.on('error', () => {
            responseClient(ctx, RES_CODE.dataFail, '分片上传失败', {
                index
            });
        })
    }
}

module.exports = new UploadController()