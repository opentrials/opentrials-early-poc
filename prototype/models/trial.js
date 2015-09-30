'use strict';

var lodash = require('lodash');

module.exports = function(sequelize, DataTypes) {
  var Trial = sequelize.define('Trial', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sourceId: {
      type: DataTypes.INTEGER,
      field: 'source_id',
      allowNull: true
    },
    publicTitle: {
      type: DataTypes.TEXT,
      field: 'public_title',
      allowNull: true
    },
    scientificTitle: {
      type: DataTypes.TEXT,
      field: 'scientific_title',
      allowNull: true
    },
    conditionOrProblem: {
      type: DataTypes.TEXT,
      field: 'condition_or_problem',
      allowNull: true
    },
    sourceOfFunding: {
      type: DataTypes.TEXT,
      field: 'source_of_funding',
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
    dateFrom: {
      type: DataTypes.DATE,
      field: 'date_from',
      allowNull: true
    },
    dateTo: {
      type: DataTypes.DATE,
      field: 'date_to',
      allowNull: true
    },
    notes: {
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
    exclusionCriteria: {
      type: DataTypes.TEXT,
      field: 'exclusion_criteria',
      allowNull: true
    },
    sampleSize: {
      type: DataTypes.TEXT,
      field: 'sample_size',
      allowNull: true
    },
    ageFrom: {
      type: DataTypes.INTEGER,
      field: 'age_from',
      allowNull: true
    },
    ageTo: {
      type: DataTypes.INTEGER,
      field: 'age_to',
      allowNull: true
    },
    sex: {
      type: DataTypes.ARRAY(DataTypes.ENUM('Male', 'Female')),
      allowNull: true,
      get: function() {
        var value = this.getDataValue('sex');
        if (!lodash.isArray(value)) {
          value = lodash.filter(
            value.substr(1, value.length - 2).split(','),
            function(item) {
              return item.length > 0;
            }
          );
          this.setDataValue('sex', value);
        }
        return value;
      }
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
    schema: sequelize.options.schema,
    tableName: 'trial',
    classMethods: {
      associate: function(models) {
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
