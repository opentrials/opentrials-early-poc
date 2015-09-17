module.exports = function(sequelize, DataTypes) {
  var Drug = sequelize.define('Drug', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    technicalName: {
      type: DataTypes.TEXT,
      field: 'technical_name',
      allowNull: true
    },
    tradeName: {
      type: DataTypes.TEXT,
      field: 'trade_name',
      allowNull: true
    },
    whoDde: {
      type: DataTypes.TEXT,
      field: 'who_dde',
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
      associate: function(models) {
        Drug.belongsToMany(models.Trial, {
          through: models.Trial2Drug,
          as: 'Trials',
          foreignKey: 'drug_id'
        });
      }
    }
  });

  return Drug;
};
