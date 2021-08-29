/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('units_areas_aspects', {
        unit_area_aspect_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        area_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        area_aspect_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'units_areas_aspects'
    });
};
