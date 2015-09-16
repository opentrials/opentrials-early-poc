module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contents: {
      type: 'BYTEA',
      allowNull: true
    }
  }, {
    tableName: 'document',
    classMethods: {
      associate: function (models) {
        Document.belongsToMany(models.Trial, {
          through: models.Trial2Document,
          as: 'Trials',
          foreignKey: 'document_id'
        });
        Document.belongsToMany(models.Review, {
          through: models.Review2Document,
          as: 'Reviews',
          foreignKey: 'document_id'
        });
      }
    }
  });

  return Document;
};
