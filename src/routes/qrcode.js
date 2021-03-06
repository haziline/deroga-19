const QRCode = require('qrcode');
const Joi = require('@hapi/joi');
const { v4 } = require('uuid');
const pdf = require('../modules/pdf');
const { encrypt } = require('../modules/crypto');
const redisClient = require('../modules/redis');
const { app: { baseURL, months } } = require('../modules/config');

const schema = Joi.object({
  fullname: Joi.string().max(64).required(),
  day: Joi.number().min(1).max(31).required(),
  month: Joi.any().valid(...months).required(),
  year: Joi.number().min(1900).max(2020).required(),
  street: Joi.string().max(128).required(),
  zipcode: Joi.string().max(64).required(),
  city: Joi.string().max(64).required(),
  raison: Joi.any().valid(...['1', '2', '3', '4', '5', '6', '7']).required(),
  doneAt: Joi.string().max(128).required(),
  doneOn: Joi.string().max(64).required(),
  signature:  Joi.string().required(),
});

module.exports = async (ctx, next) => {
  try {
    const { value, error } = await schema.validate(ctx.request.body);

    if (error) {
      error.status = 400;
      error.message = 'Bad request';
      throw error;
    }

    const signatureKey = v4();
    const {
      fullname,
      day,
      month,
      year,
      street,
      zipcode,
      city,
      raison,
      doneAt,
      doneOn,
      signature,
    } = value;
    const birthdate = `${day}/${months.indexOf(month) + 1}/${year}`;
    const address = `${street}, ${zipcode} ${city}`;
    await redisClient.store(signatureKey, signature);
    const params = `${fullname}|${birthdate}|${address}|${raison}|` +
      `${doneAt}|${doneOn}|${signatureKey}`;
    const encryptedParams = encrypt(params);
    const qrCodeURL = `${baseURL}/deroga/${encryptedParams}`;
    const qrCode = await QRCode.toDataURL(qrCodeURL, { errorCorrectionLevel: 'L' });

    ctx.status = 200;

    const res = {
      fullname,
      birthdate,
      address,
      raison,
      doneAt,
      doneOn,
      signature,
      qrCode,
      baseURL,
      disabled: true,
    };

    const pdfBuffer = Buffer.from(await pdf.createPDF('../views/qrcode.pug', Object.assign({ pdf: true, hidden: true }, res))).toString('base64');

    return ctx.render('qrcode.pug', Object.assign({ pdfBuffer }, res));
  } catch (err) {
    ctx.err = err;
    await next();
  }
};
