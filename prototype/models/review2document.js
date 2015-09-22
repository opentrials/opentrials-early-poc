'use strict';

module.exports = function(sequelize, DataTypes) {
  var Review2Document = sequelize.define('Review2Document', {
    reviewId: {
      type: DataTypes.INTEGER,
      field: 'review_id',
      allowNull: false
    },
    documentId: {
      type: DataTypes.INTEGER,
      field: 'document_id',
      allowNull: false
    }
  }, {
    tableName: 'review2document'
  });

  return Review2Document;
};
