'use strict';

module.exports = function(sequelize, DataTypes) {
  var Trial2Drug = sequelize.define('Trial2Drug', {
    trialId: {
      type: DataTypes.INTEGER,
      field: 'trial_id',
      allowNull: false
    },
    drugId: {
      type: DataTypes.INTEGER,
      field: 'drug_id',
      allowNull: false
    }
  }, {
    schema: sequelize.options.schema,
    tableName: 'trial2drug'
  });

  return Trial2Drug;
};
