module.exports = function (sequelize, DataTypes) {
    return sequelize.define('document_scopes', {
        document_scope_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        document_scope_description: { type: DataTypes.STRING(100), allowNull: false, unique:true, comment: 'Scope is the scope of the legal requirement in relation to the territory' }
    }, {
        tableName: 'document_scopes'
    });
};