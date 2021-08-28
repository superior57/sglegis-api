/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers_units', {
    customer_unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    customer_unit_cnpj: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'The company registration number'
    },
    customer_unit_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Unit name'
    },
    customer_unit_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'The fisical location of unit'
    },
    customer_unit_city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cities',
        key: 'city_id'
      },
      comment: 'The city of unit'
    },
    customer_unit_uf_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'states',
        key: 'state_id'
      },
      comment: 'The state of the unit'
    },
    customer_unit_cep: {
      type: DataTypes.STRING(9),
      allowNull: true,
      comment: 'The ZIP Code of unit'
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customer_id'
      },
      comment: 'The customer that belongs this unit'
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
    tableName: 'customers_units'
  });
};
