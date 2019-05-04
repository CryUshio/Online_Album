module.exports = async (ctx, { db }) => {
  const data = ctx.request.query;
  const length = +data.len || 0;

  let query;
  if (data.label) {
    if (data.label === '-1') {
      query = await db.sql('SELECT pic_id, pic_name, pic_url, UNIX_TIMESTAMP(upload_time) as upload_time, uname FROM pic, album, user WHERE pic.album_id=album.album_id AND album.album_owner=user.uid');
    } else {
      query = await db.sql(`SELECT pic_id, pic_name, pic_url, UNIX_TIMESTAMP(upload_time) as upload_time, uname FROM pic, album, user
      WHERE pic.album_id=album.album_id AND album.album_owner=user.uid AND album.tag='${data.label}'`);
    }
  } else if (data.albumid) {
    query = await db.sql(`SELECT * FROM pic WHERE album_id=${data.albumid}`);
  }

  if (query.code !== 0) {
    ctx.body = { code: 2, msg: '系统繁忙，请稍后重试' };
    return;
  }

  const returnValue = {
    code: 0,
    data: length ? query.res.slice(length, length + 5) : query.res,
  };
  ctx.body = returnValue;
};