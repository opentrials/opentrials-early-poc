'use strict';

module.exports = function(sequelize, DataTypes) {
  var Trial2Condition = sequelize.define('Trial2Condition', {
    trialId: {
      type: DataTypes.INTEGER,
      field: 'trial_id',
      allowNull: false
    },
    conditionId: {
      type: DataTypes.INTEGER,
      field: 'condition_id',
      allowNull: false
    }
  }, {
    schema: sequelize.options.schema,
    tableName: 'trial2condition'
  });

  return Trial2Condition;
};
