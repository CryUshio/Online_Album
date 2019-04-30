const path = require('path');
const Database = require('./db');
const { cleanCache, sleep } = require('./utils');

const db = new Database();
const tokenPool = new Map();

const whiteList = /(login|register|logout|picList)/;

module.exports = async (ctx, next) => {
  const reqPath = ctx.request.path;
  if (!whiteList.test(reqPath)) {
    const token = ctx.cookies.get('x-token');
    const uid = tokenPool.get(token);
    if (!uid) {
      ctx.body = { code: 999, msg: '登录已失效' };
      return;
    }
  }
  const handlerPath = path.join(__dirname, reqPath);
  try {
    cleanCache(require.resolve(handlerPath));
  } catch (e) {
    console.log(e);
  }
  const handler = require(handlerPath);
  await sleep(1000);
  await handler(ctx, { db, tokenPool });
  next();
};