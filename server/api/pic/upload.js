const path = require('path');
const fs = require('fs');
const uuid = require('node-uuid');

module.exports = async (ctx, { db }) => {
  const data = ctx.request.body;
  const file = ctx.request.files.img;
  const ext = file.name.split('.').pop();
  const filename = uuid.v1() + '.' + ext;

  const savePath = path.join(__dirname, '../../assets', filename);

  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(savePath);

  const writeRes = await new Promise((resolve) => {
    const stream = reader.pipe(writer);

    stream.on('finish', () => {
      resolve(true);
    });
    stream.on('error', () => {
      resolve(false);
    });
  });

  const createPic = db.sql(`INSERT INTO pic(pic_name, pic_url, album_id)
    VALUES('${data.img_name}', '/assets/${filename}', ${data.album_id})`);
  const albumCover = db.sql(`UPDATE album SET album_cover='/assets/${filename}' WHERE album_id=${data.album_id}`);
  const res = await Promise.all([createPic, albumCover]);
  if (res[0].code !== 0 || !writeRes) {
    ctx.body = { code: 2, msg: '上传异常！' };
    return;
  }

  const result = {
    code: 0,
  };
  ctx.body = result;
};