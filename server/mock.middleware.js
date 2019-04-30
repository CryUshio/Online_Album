const path = require('path');
const Database = require('./db');
const { cleanCache, sleep } = require('./utils');

const db = new Database();

module.exports = async (ctx, next) => {
  const reqPath = ctx.request.path;
  const handlerPath = path.join(__dirname, reqPath);
  try {
    cleanCache(require.resolve(handlerPath));
  } catch (e) {
    console.log(e);
  }
  const handler = require(handlerPath);
  await sleep(1000);
  await handler(ctx, db);
  next();
};