const { customers_units, units_contacts } = require('../models');
const base = require('./baseController');
const db = require('../models/index');
const sequelize = require('sequelize');

exports.getAll = (req, res, next) => {
    db.sequelize.query(`select * 
    from customers_units u 
    left join units_contacts c on (u.customer_unit_id = c.unit_contact_customer_unit_id)
    join customers cs on (cs.customer_id = u.customer_id)
    join customers_groups cg on (cg.customer_group_id = cs.customer_group_id)    
    order by u.customer_unit_name asc`).then(values => {
        res.send(values[0]);
    });
}

exports.getQuery = (req, res, next)=>{
    base.query(customers_units, req, res, next);
}

exports.getAreasAspects = (req, res, next) => {
    let sql = `select ap.*, ar.area_name, uaa.unit_area_aspect_id
                from areas_aspects ap
                join areas ar on (ap.area_id = ar.area_id)
                left join units_areas_aspects uaa on (uaa.area_id = ar.area_id and uaa.area_aspect_id = ap.area_aspect_id and uaa.customer_unit_id = ${req.params.id})                
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
                            "checked": (values[k].unit_area_aspect_id) ? "S" : "N",
                            "previous": (values[k].unit_area_aspect_id) ? "S" : "N",
                            "unit_area_aspect_id": values[k].unit_area_aspect_id
                        });
                }
            }
        }
        res.send(areas);
    });
}

exports.get = (req, res, next) => {
    base.get(customers_units, req, res, next, 'customer_unit_id');
};

exports.getAspects = (req, res, next) => {
    let sql = `select *
    from areas_aspects ap
    join areas ar on (ap.area_id = ar.area_id)
    left join units_areas_aspects uaa on (uaa.area_id = ar.area_id and uaa.area_aspect_id = ap.area_aspect_id)
    where (uaa.customer_unit_id = ${req.params.id} or uaa.customer_unit_id is null)
    order by ar.area_name, ap.area_aspect_name`;
    db.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(values => {
        let ret = [];
        let area_name = "";
        let obj;
        for (let i = 0; i < values.length; i++) {
            if (area_name != values[i].area_name) {
                if (area_name != "") {
                    ret.push(obj);
                }
                area_name = values[i].area_name;
                obj = new Object();
                obj.area_name = values[i].area_name;
                obj.area_id = values[i].area_id;
                obj.aspects = [];
            }
            obj.aspects.push({
                "area_aspect_id": values[i].area_aspect_id,
                "area_aspect_name": values[i].area_aspect_name,
                "customer_unit_id": values[i].customer_unit_id
            });
        }
        res.send(ret);
    });

}

exports.post = (req, res, next) => {
    //fazer insert da unidade
    let u = customers_units.create(req.body, { isNewRecord: true })
        .then(values => {
            //agora insert da unitcontact                
            req.body.unit_contact_customer_unit_id = values.customer_unit_id;
           
            units_contacts.create(req.body, { isNewRecord: true })
            .then(v => {
                res.send(values);
            })
            .catch(err => {
                next(err);
            });
        })
        .catch(err => {
            next(err);
        });

}

exports.put = (req, res, next) => {
    let u = customers_units.update(req.body, { where: { customer_unit_id: req.body.customer_unit_id } })
        .then(values => {
            //agora insert da unitcontact                
            req.body.unit_contact_customer_unit_id = (values.customer_unit_id ? values.customer_unit_id : req.body.customer_unit_id);

            units_contacts.update(req.body, { where: { unit_contact_customer_unit_id: req.body.unit_contact_customer_unit_id } })
            .then(values => {
                res.send(values);
            })
            .catch(err => {
                next(err);
            });
        })
        .catch(err => {
            next(err);
        });
}

exports.delete = (req, res, next) => {
    base.delete(customers_units, req, res, next, 'customer_unit_id');
}



