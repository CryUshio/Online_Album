module.exports = async (ctx, { db }) => {
  const { data } = ctx.request.body;

  const query = await db.sql(`SELECT uname FROM user WHERE uname='${data.uname}'`);
  if (query.code !== 0) {
    ctx.body = { code: 2, msg: '系统繁忙，请稍后重试' };
    return;
  } else if (query.res.length) {
    ctx.body = { code: 1, msg: '用户名已存在' };
    return;
  }

  const result = await db.sql(`INSERT INTO user(uname, upsd, uemail) VALUES('${data.uname}', '${data.upsd}', '${data.uemail}')`);
  if (result.code !== 0) {
    ctx.body = { code: 2, msg: '系统繁忙，请稍后重试' };
    return;
  }
  const returnValue = {
    code: 0,
  };
  ctx.body = returnValue;
};
