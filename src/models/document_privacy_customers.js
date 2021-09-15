
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('document_privacy_customers', {
        document_privacy_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true },
        customer_group_id:{ type: DataTypes.INTEGER, allowNull: true, comment: 'The customer group that owns the document'},
        customer_id:{ type: DataTypes.INTEGER, allowNull: true, comment: 'The customer that owns the document'},
        customer_unit_id:{ type: DataTypes.INTEGER, allowNull: true, comment: 'The customer unit that owns the document'},
        document_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'documents', key: 'document_id' }, comment: 'The document that is private' },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    },{
        tableName: 'document_privacy_customers'
    });
};