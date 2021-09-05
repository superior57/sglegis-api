module.exports = function (sequelize, DataTypes) {
    return sequelize.define('audit_items', {
        audit_item_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        audits_audit_id: { type: DataTypes.INTEGER, allowNull: false, references:{model: 'audits', key: 'audit_id'}, comment: 'The id of audit which this item belongs to' },
        audit_practical_order: { type: DataTypes.INTEGER, allowNull: true, comment: 'If the document applies to the unit matched' },
        audit_conformity: { type: DataTypes.INTEGER, allowNull: true, comment: 'If the unit matched is in conformity with the matched document item' },
        audit_evidnece_compliance: { type: DataTypes.TEXT, allowNull: true, comment: 'If unit is or not in conformity, whats the evidences' },
        audit_control_action: { type: DataTypes.TEXT, allowNull: true, comment: 'Description of which actions is taken about this document on the matched unit' },
        user_id: { type: DataTypes.INTEGER, allowNull: false, comment: 'The user logged who inserted the audit' },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
      
    }, {
        tableName: 'audit_items'
    });
};