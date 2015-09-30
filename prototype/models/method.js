'use strict';

module.exports = function(sequelize, DataTypes) {
  var Method = sequelize.define('Method', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    schema: sequelize.options.schema,
    tableName: 'method',
    classMethods: {
      associate: function(models) {
        Method.belongsToMany(models.Trial, {
          through: models.Trial2Method,
          as: 'Trials',
          foreignKey: 'method_id'
        });
      }
    }
  });

  return Method;
};
