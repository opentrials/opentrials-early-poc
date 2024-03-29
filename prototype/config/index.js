'use strict';

var path = require('path');
var nconf = require('nconf');

nconf.file({
  file: path.join(__dirname, '/../settings.json')
});

// This is the object that you want to override in your own local config
nconf.defaults({
  env: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || null,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    schema: process.env.DB_SCHEMA || 'public',
    logging: false,
    define: {
      charset: 'utf-8',
      collate: 'utf8_general_ci',
      timestamps: false
    }
  },
  session: {
    name: 'NSESSID',
    secret: 'REPLACE WITH YOUR OWN SECRET',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  access: {
    isProtected: process.env.IS_PROTECTED || false,
    token: process.env.ACCESS_TOKEN || null
  },
  appconfig: {
    port: process.env.PORT || 3000
  }
});

module.exports = {
  get: function(key) {
    return nconf.get.call(nconf, key);
  },
  set: nconf.set.bind(nconf),
  reset: nconf.reset.bind(nconf)
};
