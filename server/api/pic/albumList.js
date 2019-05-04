module.exports = async (ctx, { db, tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  const uid = tokenPool.get(token);

  const query = await db.sql(`SELECT *, UNIX_TIMESTAMP(create_date) as create_time FROM album WHERE album_owner=${uid}`);
  if (query.code !== 0) {
    ctx.body = { code: 2, msg: '系统繁忙，请稍后重试' };
    return;
  }

  const returnValue = {
    code: 0,
    data: query.res,
  };
  ctx.body = returnValue;
};