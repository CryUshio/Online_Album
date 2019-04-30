
module.exports = async (ctx, { tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  tokenPool.remove(token);

  const result = {
    code: 0,
  };
  ctx.body = result;
  ctx.cookies.set('x-token', '', {
    domain: ctx.request.domain,
    path: '/', // cookie写入的路径
    maxAge: 0,
    httpOnly: false,
    overwrite: false
  });
};
