
module.exports = async (ctx, { db, tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  const uid = tokenPool.get(token);
  if (!uid) {
    ctx.body = { code: 999 };
    return;
  }

  const query = await db.sql(`SELECT * FROM user WHERE uid=${uid}`);
  if (query.code !== 0) {
    ctx.body = { code: 1, msg: '系统繁忙，请稍后重试' };
    return;
  }

  const userInfo = query.res[0];
  const result = {
    code: 0,
    data: userInfo
  };
  ctx.body = result;

};
