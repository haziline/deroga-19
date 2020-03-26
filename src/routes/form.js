const { app: { months } } = require('../modules/config');

module.exports = async (ctx) => {
  ctx.status = 200;
  return ctx.render('form.pug', { months, disabled: false });
};
