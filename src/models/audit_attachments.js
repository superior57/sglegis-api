module.exports = function (sequelize, DataTypes) {
    return sequelize.define('audit_attachments', {
        audit_attachment_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        audit_attachment_item_id: { type: DataTypes.INTEGER, allowNull: false, Comment: 'Auditoria que o anexo está associado.'},
        audit_attachment_description: {type: DataTypes.STRING(200),allowNull: true },
        audit_attachment_src: { type: DataTypes.STRING(268), allowNull: false },
        audit_id: { type: DataTypes.INTEGER, allowNull: false , Comment: 'ID da auditoria que este item pertence'}
    }, {
        tableName: 'audit_attachments'
    });
};