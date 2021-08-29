const db = require('../models');
const { units_areas_aspects } = require('../models');
const base = require('./baseController');
const sequelize = require('sequelize');


exports.get = async (req, res, next) => {
    let sql = `select ap.*, ar.area_name, uaa.unit_area_aspect_id
                from areas_aspects ap
                inner join areas ar on (ap.area_id = ar.area_id)
                inner join units_areas_aspects uaa on (uaa.area_id = ar.area_id and uaa.area_aspect_id = ap.area_aspect_id and uaa.customer_unit_id = ${req.params.id})                
               order by ar.area_id, ap.area_aspect_name `;

    db.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(values => {
        let obj = new Object();
        let areas = [];
        let areas_id = [];
        for (let i = 0; i < values.length; i++) {
            if (!areas_id.includes(values[i].area_id)) {
                areas_id.push(values[i].area_id);
                areas.push({ "area_id": values[i].area_id, "area_name": values[i].area_name, "aspects": [] });
            }
        }

        for (let j = 0; j < areas.length; j++) {
            for (let k = 0; k < values.length; k++) {
                if (values[k].area_id == areas[j].area_id) {
                    areas[j].aspects.push(
                        {
                            "area_aspect_id": values[k].area_aspect_id,
                            "area_aspect_name": values[k].area_aspect_name,
                            "unit_area_aspect_id": values[k].unit_area_aspect_id
                        });
                }
            }
        }
        console.log(JSON.stringify(areas));
        res.send(areas);
    });
}

exports.post = (req, res, next) => {
    base.insert(units_areas_aspects, req, res, next);
}

exports.delete = (req, res, next) => {
    base.deleteWithParam(units_areas_aspects, req, res, next, 'unit_area_aspect_id', req.params.unit_area_aspect_id);
}
