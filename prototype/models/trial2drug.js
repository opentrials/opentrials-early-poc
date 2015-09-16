module.exports = function(sequelize, DataTypes) {
  var Trial2Drug = sequelize.define('Trial2Drug', {
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    drug_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'trial2drug'
  });

  return Trial2Drug;
};
