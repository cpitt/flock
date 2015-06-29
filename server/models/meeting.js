'use strict';

module.exports = function(sequelize, DataTypes) {
  var attrs = {
    id  : { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  };

  var options = {
  };

  return sequelize.define('Meeting', attrs, options);
};

