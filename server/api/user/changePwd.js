
module.exports = async (ctx, { db, tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  const uid = tokenPool.get(token);
  const { data } = ctx.request.body;

  const update = await db.sql(`UPDATE user SET upsd='${data.newupsd}' WHERE uid=${uid} AND upsd='${data.upsd}'`);
  console.log(update);
  if (update.code !== 0) {
    ctx.body = { code: 1, msg: '系统繁忙，请稍后重试' };
    return;
  } else if (!update.res.affectedRows) {
    ctx.body = { code: 1, msg: '原密码有误哦，再仔细检查下~' };
    return;
  }

  const result = {
    code: 0,
  };
  ctx.body = result;

};
