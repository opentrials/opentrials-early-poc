'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var Umzug = require('umzug');
var basename = path.basename(module.filename);
var migrationsDir = path.join(module.filename, '/../../migrations');
var umzug;
var sequelize;
var db = {};

var dbConfig = require('../config').get('database');

if (dbConfig.url) {
  sequelize = new Sequelize(dbConfig.url, dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username,
    dbConfig.password, dbConfig);
}

sequelize.define('SequelizeMeta', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: false
  }
}, {
  schema: sequelize.options.schema,
  tableName: 'sequelizemeta'
});

umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
    modelName: 'SequelizeMeta'
  },
  migrations: {
    params: [sequelize.getQueryInterface(), Sequelize],
    path: migrationsDir
  }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file.slice(-1) !== '~') &&
      (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.umzug = umzug;

module.exports = db;
