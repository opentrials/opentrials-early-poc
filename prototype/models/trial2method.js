module.exports = function(sequelize, DataTypes) {
  var Trial2Method = sequelize.define('Trial2Method', {
    trialId: {
      type: DataTypes.INTEGER,
      field: 'trial_id',
      allowNull: false
    },
    methodId: {
      type: DataTypes.INTEGER,
      field: 'method_id',
      allowNull: false
    }
  }, {
    tableName: 'trial2method'
  });

  return Trial2Method;
};
