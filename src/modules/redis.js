const debug = require('debug')('redis');
const redis = require('redis');
const { redis: { url, retryAttempt, retryTimeout } } = require('./config');

const SEC_TO_MIL = 1000;

const client = redis.createClient({
  url,
  retry_strategy: (options) => {
    if (options.total_retry_time > retryTimeout) {
      return new Error('Retry timeout exhausted');
    }

    if (options.attempt > retryAttempt) {
      return new Error('Retry attempt exhausted');
    }

    return options.attempt * SEC_TO_MIL;
  },

});

client.on('error', function(error) {
  debug(error);
});

client.on('ready', function() {
  debug('Connection established');
});

client.on('reconnecting', function(options) {
  debug(`Reconnecting attempt=${options.attempt} delay=${options.delay}`);
});


function getSecUntilMidnight() {
  const midnight = new Date();

  midnight.setHours(24);
  midnight.setMinutes(0);
  midnight.setSeconds(0);

  return Math.round((midnight.getTime() - new Date().getTime()) / 1000);
}

function store(key, value) {
  return new Promise((resolve, reject) => {
    const ttl = getSecUntilMidnight();
    client.set(key, value, 'EX', ttl, (err, res) => {
      if (err) return reject(err);
      debug(`stored key=${key}`);
      return resolve(res);
    });
  });
}

function fetch(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, res) => {
      if (err) return reject(err);
      debug(`fetched key=${key}`);
      return resolve(res);
    });
  });
}

module.exports = {
  store,
  fetch,
};
