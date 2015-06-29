'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    queryInterface.createTable(
      'members',
      {
        id                       : { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, primaryKey: true, autoIncrement: true },

        individualId             : { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true, field: 'individual_id'},
        mrn                      : { type: DataTypes.STRING, allowNull: true,  unique: true},
        givenName                : { type: DataTypes.STRING, field: 'given_name' },
        surName                  : { type: DataTypes.STRING, field: 'sur_name' },
        preferredName            : { type: DataTypes.STRING, field: 'preferred_name' },
        gender                   : { type: DataTypes.STRING },
        email                    : { type: DataTypes.STRING },
        phone                    : { type: DataTypes.STRING },
        address1                 : { type: DataTypes.STRING },
        address2                 : { type: DataTypes.STRING },
        state                    : { type: DataTypes.STRING },
        postal                   : { type: DataTypes.STRING },
        lat                      : { type: DataTypes.FLOAT },
        long                     : { type: DataTypes.FLOAT },
        birthDate                : { type: DataTypes.DATE, field: 'birth_date'},
        dateMovedIntoCurrentUnit : { type: DataTypes.DATE, field: 'date_moved_in_unit'},
        photoUrl                 : { type: DataTypes.STRING, field: 'photo_url'},
        importData               : { type: DataTypes.JSONB, field: 'import_data', defaultValue: {}},

        ceatedAt                 : { type: DataTypes.DATE, field: 'created_at'},
        updatedAt                : { type: DataTypes.DATE, field: 'updated_at'}
      }
    )
    .then(function(){
      queryInterface.addIndex( 'members', [ 'individual_id' ] );
    });

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('members');
  }
};
