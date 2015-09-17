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
    centralId: {
      type: DataTypes.INTEGER,
      field: 'central_id',
      allowNull: true
    },
    centralStatus: {
      type: DataTypes.TEXT,
      field: 'central_status',
      allowNull: true
    },
    centralDate: {
      type: DataTypes.DATE,
      field: 'central_date',
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
          through: models.Trial2Review,
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
