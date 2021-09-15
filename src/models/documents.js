
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('documents', {
        document_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true },
        document_scope_id: { type: DataTypes.INTEGER, allowNull: false },
        document_type: { type: DataTypes.TEXT, allowNull: true },
        document_number: { type: DataTypes.STRING(50), allowNull: true, defaultValue: 'S/N' },
        document_date: { type: DataTypes.DATE, allowNull: false },
        document_status_id: { type: DataTypes.INTEGER, allowNull: false },
        document_summary: { type: DataTypes.STRING(2000), allowNull: false },
        document_state_id: { type: DataTypes.INTEGER, allowNull: true, comment: "The region of country document is valid (filled when scope = state)" },
        document_city_id: { type: DataTypes.INTEGER, allowNull: true, comment: "The city of region (state) document is valid (filled when scope = city)" },
        document_privacy_type: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: "0 = public (available for all customers) / 1 = private (need to check table document_privacy_customers)" },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    }, {
        indexes: [{
            unique: true,
            name: 'uniq_document',
            fields: ['document_number', 'document_scope_id', 'document_date', 'document_state_id', 'document_city_id']
          }]
    },{
        tableName: 'documents'
    });
};