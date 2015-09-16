module.exports = function(sequelize, DataTypes) {
  var Trial2Review = sequelize.define('Trial2Review', {
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'trial2review'
  });

  return Trial2Review;
};
