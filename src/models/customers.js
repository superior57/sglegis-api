/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true
    },
    customer_business_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'The customer known name'
    },
    customer_cnpj: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: 'Customer code'
    },
    customer_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'customers_groups',
        key: 'customer_group_id'
      },
      comment: 'The group of its customer belongs to'
    }
  }, {
    tableName: 'customers'
  });
};
