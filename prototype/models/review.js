module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contacts: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    central_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    central_status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    central_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    authors: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    publisher: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    journal: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    year: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    volume: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    issue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pages: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'review',
    classMethods: {
      associate: function (models) {
        Review.belongsToMany(models.Trial, {
          through: models.Trial2Condition,
          as: 'Trials',
          foreignKey: 'review_id'
        });
        Review.belongsToMany(models.Document, {
          through: models.Review2Document,
          as: 'Documents',
          foreignKey: 'review_id'
        });
      }
    }
  });

  return Review;
};
