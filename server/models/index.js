'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var Umzug = require('umzug');
var settings = require('../config/env/default');
var Promise = require('bluebird');

var sequelize = new Sequelize(settings.database.database, settings.database.username, settings.database.password, settings.database.options);
var umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize
  },
  migrations: {
    params: [sequelize.getQueryInterface(), Sequelize, function() {
      throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
    }],
    path: settings.database.migrations.path,
    pattern: /\.js$/,
    wrap: function(fun) {
      return Promise.promisify(fun);
    }
  }});
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.umzug = umzug;
db.Umzug = Umzug;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
