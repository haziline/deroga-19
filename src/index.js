require('dotenv').config({ silent: true });
const debug = require('debug')('http');
const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const serve = require('koa-static');
const Router = require('koa-router');
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser');
const { app: { port } } = require('./modules/config');
// routes import
const homeRoute = require('./routes');
const formRoute = require('./routes/form');
const qrcodeRoute = require('./routes/qrcode');
const derogaRoute = require('./routes/deroga');

const app = new Koa();
const router = new Router();

// set middlewares
app
  .use(bodyParser())
  .use(serve(path.join(__dirname, '../public')))
  .use(favicon(path.join(__dirname, '../public/img/favicon.ico')))
  .use(logger())
  .use(views(path.join(__dirname, 'views'), { extension: 'pug' }));

// set routes
router
  .get('/', homeRoute)
  .get('/form', formRoute)
  .post('/qrcode', qrcodeRoute)
  .get('/deroga/:key', derogaRoute);

app.use(router.routes());

app.use(async (ctx, next) => {
  try {
    await next();
    if (!ctx.err) {
      ctx.err = new Error('Not found');
      ctx.err.status = 404;
    }

    throw ctx.err;
  } catch (err) {
    debug(err);
    err.status = err.statusCode || err.status || 500;
    if (err.status === 500) {
      err.message = 'Internal server error';
    }
    return ctx.render('error.pug', { code: err.status, msg: err.message });
  }
});

app.on('error', (err, ctx) => {
  debug(err, ctx);
});

app.listen(port);
debug(`Server start listening on port ${port}`);

module.exports = app;
