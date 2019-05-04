
module.exports = async (ctx, { db, tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  const uid = tokenPool.get(token);
  const { data } = ctx.request.body;

  const create = await db.sql(`INSERT INTO album(album_name, album_owner, album_describe, tag)
    VALUES('${data.aname}', ${uid}, '${data.adescribe}', '${data.tags}')`);
  if (create.code !== 0) {
    ctx.body = { code: 1, msg: '系统繁忙，请稍后重试' };
    return;
  }

  const result = {
    code: 0,
  };
  ctx.body = result;

};
