/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('units_aspects_responsibles', {
        unit_aspect_responsible_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customer_unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_aspect_responsible_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        unit_aspect_responsible_email: {
            type: DataTypes.STRING(400),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'units_aspects_responsibles'
    });
};
