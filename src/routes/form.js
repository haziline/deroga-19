const { app: { months, baseURL } } = require('../modules/config');

module.exports = async (ctx) => {
  ctx.status = 200;
  return ctx.render('form.pug', { months, baseURL });
};
