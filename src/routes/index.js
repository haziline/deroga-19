module.exports = async (ctx) => {
  ctx.status = 200;
  return ctx.render('index.pug');
};
