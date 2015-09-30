'use strict';

module.exports = function(sequelize, DataTypes) {
  var Trial2Review = sequelize.define('Trial2Review', {
    trialId: {
      type: DataTypes.INTEGER,
      field: 'trial_id',
      allowNull: false
    },
    reviewId: {
      type: DataTypes.INTEGER,
      field: 'review_id',
      allowNull: false
    }
  }, {
    schema: sequelize.options.schema,
    tableName: 'trial2review'
  });

  return Trial2Review;
};
