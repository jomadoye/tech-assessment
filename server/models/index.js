'use strict';

require('dotenv')
  .config();

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + './../config/config')[env];
var db        = {};


// var databaseUrl = 'postgres://pyreanii:og0MX9MODR32YCFjbC4GXifldrJVOJMK@stampy.db.elephantsql.com:5432/pyreanii';
var databaseUrl = 'postgres://jed:Jedidiah007@localhost:5432/techuserlogin';
var sequelize = new Sequelize(databaseUrl, config);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
