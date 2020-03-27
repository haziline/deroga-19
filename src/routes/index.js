const { app: { baseURL } } = require('../modules/config');

module.exports = async (ctx) => {
  ctx.status = 200;
  return ctx.render('index.pug', { baseURL });
};
