const crypto = require('crypto');

const MD5 = function (data) {
  const md5 = crypto.createHash('md5').update(data).digest('hex');
  return md5;
};


module.exports = async (ctx, db) => {
  const { data } = ctx.request.body;
  const query = await db.sql(`SELECT uname FROM user WHERE uname='${data.username}' and upsd='${data.password}'`);
  if (query.code !== 0) {
    ctx.body = { code: 2, msg: '系统繁忙，请稍后重试' };
    return;
  } else if (!query.res.length) {
    ctx.body = { code: 1, msg: '用户名或密码错误' };
    return;
  }

  const token = ctx.request.body + Date.now();
  const result = {
    code: 0,
  };
  ctx.body = result;
  ctx.cookies.set('u-token', MD5(JSON.stringify(token)), {
    domain: ctx.request.domain,
    path: '/', // cookie写入的路径
    maxAge: 1000 * 3600 * 24,
    httpOnly: false,
    overwrite: false
  });
};
