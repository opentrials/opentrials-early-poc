'use strict';

module.exports = function(sequelize, DataTypes) {
  var Trial2Document = sequelize.define('Trial2Document', {
    trialId: {
      type: DataTypes.INTEGER,
      field: 'trial_id',
      allowNull: false
    },
    documentId: {
      type: DataTypes.INTEGER,
      field: 'document_id',
      allowNull: false
    }
  }, {
    schema: sequelize.options.schema,
    tableName: 'trial2document'
  });

  return Trial2Document;
};
