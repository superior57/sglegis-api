/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unites_contacts', {
    unit_contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    unit_contact_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unit_contact_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    unit_contact_phone: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    unit_contact_observation: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    unit_contact_customer_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'unites_contacts'
  });
};
