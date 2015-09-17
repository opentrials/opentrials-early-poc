module.exports = function(sequelize, DataTypes) {
  var Condition = sequelize.define('Condition', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    meddra: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    whoIcd10: {
      type: DataTypes.TEXT,
      field: 'who_icd_10',
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'condition',
    classMethods: {
      associate: function(models) {
        Condition.belongsToMany(models.Trial, {
          through: models.Trial2Condition,
          as: 'Trials',
          foreignKey: 'condition_id'
        });
      }
    }
  });

  return Condition;
};
