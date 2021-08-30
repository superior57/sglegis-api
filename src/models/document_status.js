module.exports = function (sequelize, DataTypes) {
    return sequelize.define('document_status', {
        status_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        status_description: { type: DataTypes.STRING(100), allowNull: false, unique: true, comment: 'The status of document, like, if it is active or not' },
        createdAt: { type: DataTypes.DATE, allowNull: true },
        updatedAt: { type: DataTypes.DATE, allowNull: true}
    }, {
        tableName: 'document_status'
    });
};