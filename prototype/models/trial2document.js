module.exports = function(sequelize, DataTypes) {
  var Trial2Document = sequelize.define('Trial2Document', {
    trial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'trial2document'
  });

  return Trial2Document;
};
