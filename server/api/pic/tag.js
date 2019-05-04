module.exports = async (ctx, { db }) => {
  const query = await db.sql('SELECT * FROM tag');
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