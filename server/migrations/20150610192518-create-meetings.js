'use strict';

module.exports = {
  up: function (sequelize, DataTypes) {
    sequelize.createTable(
      'meetings',
      {
        id       : { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, primaryKey: true, autoIncrement: true },
        name     : { type: DataTypes.STRING, allowNull: false },
        ceatedAt : { type: DataTypes.DATE, field: 'created_at'},
        updatedAt: { type: DataTypes.DATE, field: 'updated_at'}
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('classes');
  }
};
