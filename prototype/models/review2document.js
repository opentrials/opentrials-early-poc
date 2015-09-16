module.exports = function(sequelize, DataTypes) {
  var Review2Document = sequelize.define('Review2Document', {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'review2document'
  });

  return Review2Document;
};
