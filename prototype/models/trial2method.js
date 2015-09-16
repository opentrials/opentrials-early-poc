module.exports = function(sequelize, DataTypes) {
  var Trial2Method = sequelize.define('Trial2Method', {
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    method_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'trial2method'
  });

  return Trial2Method;
};
