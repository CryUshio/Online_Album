const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mockMiddleware = require('./mock.middleware');
const chalk = require('chalk');

const app = new Koa();
const port = process.env.port || 4200;

app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
});
app.use(async (ctx, next) => {
  const data = ctx.request.body;
  const query = ctx.request.query;
  console.log(chalk.bgBlue(`\n\n ${chalk.black(ctx.request.method)} `) + ` ${ctx.request.path}\n`);
  console.log(JSON.stringify({ ...data, ...query }, null, 2));
  await next();
});

app.use(mockMiddleware);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(chalk.bgGreen(chalk.black(' running ')) + ` Listening at http://localhost${port === 80 ? '' : ':' + port}`);
});