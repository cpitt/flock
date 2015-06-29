/**
 * Node Server Configuration
 */
'use strict';

// Module dependencies.
var express = require('express');

// Add coloring for console output
require('colors');

// Create Express server.
var app = express();

// Database configuration
var db = require('./server/models/index.js');

// Express configuration
require('./server/config/express')(app, express, db);

// Verify database connection and sync tables
db
  .sequelize
  .authenticate()
  .then( function(){
    console.log('✔ Database Connection Success!'.green);
      db.umzug.up()
        .then( function(migrations) {
          console.log('✔ Migrations Successful!'.green);
        })
        .catch(function(err) {
          console.log('✗ Database not Migrated!'.red + err);
        });
  })
  .catch( function(err){
    console.log( '✗ Database Connection Error: '.red + err );
  });

// Start Express server.
app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on port '.green + '%d'.blue + ' in '.green + '%s'.blue + ' mode'.green, app.get('port'), app.get('env'));
});

module.exports = app;
