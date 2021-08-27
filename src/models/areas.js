/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('areas', {
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    area_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: 'The Management System (former Area).'
    }
  }, {
    tableName: 'areas'
  });
};
