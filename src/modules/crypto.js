const crypto = require('crypto');
const { app: { encryptionKey } } = require('./config');

const IV_LENGTH = 16;

function encrypt(data) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return iv.toString('hex') + '+' + encrypted.toString('hex');
}

function decrypt(data) {
  const [ivPart, dataPart] = data.split('+');
  const iv = Buffer.from(ivPart, 'hex');
  const encryptedText = Buffer.from(dataPart, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
};
