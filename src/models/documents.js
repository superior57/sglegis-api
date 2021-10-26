
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('documents', {
        document_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement : true },
        document_scope_id: { type: DataTypes.INTEGER, allowNull: false, comment: "The scope this document can range (global, country, state or city) - (document_scopes model)" },
        document_type: { type: DataTypes.TEXT, allowNull: true, comment: "The type of document. Commonly is a law or standard rule (norm)." },
        document_number: { type: DataTypes.STRING(100), allowNull: true, defaultValue: 'S/N', comment: "A control number of document" },
        document_date: { type: DataTypes.DATE, allowNull: false, comment: "The date that this document was released" },
        document_status_id: { type: DataTypes.INTEGER, allowNull: false, comment: "The state id that this document applies (state model)" },
        document_summary: { type: DataTypes.STRING(5000), allowNull: false, comment: "A small text that summarize the document text" },
        document_state_id: { type: DataTypes.INTEGER, allowNull: true, comment: "The region of country document is valid (filled when scope = state)" },
        document_city_id: { type: DataTypes.INTEGER, allowNull: true, comment: "The city of region (state) document is valid (filled when scope = city)" },
        document_privacy_type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, comment: "0 = public (available for all customers) / 1 = private (need to check table document_privacy_customers)" },
        document_privacy_unit_id: {type: DataTypes.INTEGER, allowNull: true, references: { model: 'customers_units', key: 'customer_unit_id' }, comment: 'The unit that owns this document'},
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