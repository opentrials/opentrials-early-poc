module.exports = function(sequelize, DataTypes) {
  var Trial = sequelize.define('Trial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    source_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    public_title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    scientific_title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    condition_or_problem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    source_of_funding: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    countries: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contacts: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_from: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_to: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
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
    exclusion_criteria: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sample_size: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age_from: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    age_to: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sex: {
      type: DataTypes.ARRAY(DataTypes.ENUM('Male', 'Female')),
      allowNull: true
    },
    interventions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    outcomes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    tableName: 'trial',
    classMethods: {
      associate: function (models) {
        Trial.belongsTo(models.Source, {
          as: 'Source',
          foreignKey: 'source_id'
        });
        Trial.belongsToMany(models.Condition, {
          through: models.Trial2Condition,
          as: 'Conditions',
          foreignKey: 'trial_id'
        });
        Trial.belongsToMany(models.Document, {
          through: models.Trial2Document,
          as: 'Documents',
          foreignKey: 'trial_id'
        });
        Trial.belongsToMany(models.Drug, {
          through: models.Trial2Drug,
          as: 'Drugs',
          foreignKey: 'trial_id'
        });
        Trial.belongsToMany(models.Method, {
          through: models.Trial2Method,
          as: 'Methods',
          foreignKey: 'trial_id'
        });
        Trial.belongsToMany(models.Review, {
          through: models.Trial2Review,
          as: 'Reviews',
          foreignKey: 'trial_id'
        });
      }
    }
  });

  return Trial;
};
