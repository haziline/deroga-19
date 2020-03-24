const assert = require('assert');

assert(process.env.ENCRYPTION_KEY);
assert(process.env.BASE_URL);
assert(process.env.REDIS_URL);

const config = {
  app: {
    env: process.env.NODE_ENV || 'local',
    port: process.env.PORT || '3000',
    debug: process.env.DEBUG || 'http,redis',
    baseURL: process.env.BASE_URL,
    encryptionKey: process.env.ENCRYPTION_KEY,
    months: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
  },
  redis: {
    url: process.env.REDIS_URL,
    retryAttempt: parseInt(process.env.REDIS_RETRY_ATTEMPT) || 10,
    retryTimeout: parseInt(process.env.REDIS_RETRY_TIMEOUT) || 30000,
  },
};

module.exports = config;
