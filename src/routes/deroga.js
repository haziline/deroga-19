const { decrypt } = require('../modules/crypto');
const redisClient = require('../modules/redis');

module.exports = async (ctx, next) => {
  try {
    const [
      fullname,
      birthdate,
      address,
      raison,
      doneAt,
      doneOn,
      signatureKey,
     ] = decrypt(ctx.params.key).split('|');
    const signature = await redisClient.fetch(signatureKey);

    ctx.status = 200;

    return ctx.render('deroga.pug', {
      fullname,
      birthdate,
      address,
      raison,
      doneAt,
      doneOn,
      signature,
    });
  } catch (err) {
    ctx.err = err;
    await next();
  }
};
