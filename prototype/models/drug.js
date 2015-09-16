module.exports = function(sequelize, DataTypes) {
  var Drug = sequelize.define('Drug', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    technical_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trade_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    who_dde: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'drug',
    classMethods: {
      associate: function (models) {
        Drug.belongsToMany(models.Trial, {
          through: models.Trial2Condition,
          as: 'Trials',
          foreignKey: 'drug_id'
        });
      }
    }
  });

  return Drug;
};
