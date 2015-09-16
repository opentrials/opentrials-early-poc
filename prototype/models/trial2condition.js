module.exports = function(sequelize, DataTypes) {
  var Trial2Condition = sequelize.define('Trial2Condition', {
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    condition_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'trial2condition'
  });

  return Trial2Condition;
};
