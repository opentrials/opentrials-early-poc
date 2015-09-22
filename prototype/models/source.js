'use strict';

module.exports = function(sequelize, DataTypes) {
  var Source = sequelize.define('Source', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'source'
  });

  return Source;
};
