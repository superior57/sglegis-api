/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('areas_aspects', {
    area_aspect_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    area_aspect_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'The name of aspect'
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'areas',
        key: 'area_id'
      },
      comment: 'The id of the Management System (former Area)'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    indexes: [{
      unique: true,
      name: 'uniq_area_name',
      fields: ['area_id', 'area_aspect_name']
    }]
  }, {
    tableName: 'areas_aspects'
  });
};
