const { audits } = require('../models');
const { options } = require('./queryoptions');
const base = require('./baseController');
const { isEmpty } = require('../utils/functions');
const db = require('../models/index');
const email = require('../config/email');
const sequelize = require('sequelize');

exports.getAll = (req, res, next) => {
    const q = req.query;    
    let sql = `SELECT * FROM audits a WHERE audit_id = null`;
    let sqlPre = `SELECT a.*, aa.area_aspect_name, di.document_item_number 
        FROM audits a
        LEFT JOIN areas_aspects aa ON a.area_aspect_id = aa.area_aspect_id
        LEFT JOIN document_items di ON di.document_item_id = a.document_item_id WHERE `;
    if (!isEmpty(q)) {
        sql = sqlPre;
        if (typeof q.document_item_ids === 'object' && Array.isArray(q.document_item_ids)) {
            for (let i = 0; i < q.document_item_ids.length; i ++) {
                if (i !== q.document_item_ids.length - 1)
                    sql += `(a.document_item_id = ${q.document_item_ids[i]} AND a.area_aspect_id = ${q.area_aspect_ids[i]}) OR `;
                else
                    sql += `(a.document_item_id = ${q.document_item_ids[i]} AND a.area_aspect_id = ${q.area_aspect_ids[i]})`;            
            }
        } else {
            sql += `(a.document_item_id = ${q.document_item_ids} AND a.area_aspect_id = ${q.area_aspect_ids})`;
        }
    }
    sql.trim();
    db.sequelize.query(sql).then(values => {
        res.send(values[0]);
    });
}

exports.getQuery = (req, res, next)=>{
    base.query(audits, req, res, next);
}

exports.post = (req, res, next) => {
    base.insert(audits, req, res, next);
}

exports.post = (req, res, next) => {
    let audits = req.body;

    //if there is no id, so (insert)
    if (audits.audit_id <= 0)
        insert(audits, res);
    else
        update(audits, res);
};

function insert(audits, res) {
    db.sequelize.transaction(function (t) {
        return db.audits.create(audits, { transaction: t }).then(function (new_audit) {
            //set the new audit_id to the audit_item
            audits.audit_items.audits_audit_id = new_audit.audit_id;
            return db.audit_items.create(audits.audit_items, { transaction: t }).then(function (new_item) {
                res.send(new_item);
            });
        });
    });
}

function update (audits, res) {
    db.sequelize.transaction(function (t) {
        return db.audits.update(audits, { transaction: t, where:{audit_id: audits.audit_id} }).then(function (new_item) {
            
            audits.audit_items.audits_audit_id = audits.audit_id;
            return db.audit_items.create(audits.audit_items, { transaction: t }).then(function (new_item) {
                res.send(new_item);
            });
        });
    });
};

exports.notifyResponsibles = async (req, res, next) => {
    try {
        const { aspects, auditInformation } = req.body;
        let sql = `SELECT ra.area_aspect_id, uar.unit_aspect_responsible_email, uar.unit_aspect_responsible_id, aa.area_aspect_name
            FROM responsibles_aspects ra
            LEFT JOIN units_aspects_responsibles uar ON ra.unit_aspect_responsible_id = uar.unit_aspect_responsible_id
            LEFT JOIN areas_aspects aa ON aa.area_aspect_id = ra.area_aspect_id
            WHERE `;
        if (typeof aspects === 'object' && Array.isArray(aspects)) {
            for (let i = 0; i < aspects.length; i ++) {
                if (i < aspects.length - 1) sql += `ra.area_aspect_id = ${aspects[i]} OR `
                else sql += `ra.area_aspect_id = ${aspects[i]}`
            }
        } else {
            sql += `ra.area_aspect_id = ${aspect}`;
        }
        sql.trim();
        const values = await db.sequelize.query(sql);
        const responsibles = [];
        values[0].forEach(value => {
            if (!responsibles.find(r => r.id === value.unit_aspect_responsible_id)) {
                responsibles.push({
                    id: value.unit_aspect_responsible_id,
                    email: value.unit_aspect_responsible_email,
                    aspects: [ value.area_aspect_name ]
                })
            } else {
                responsibles.find(r => r.id === value.unit_aspect_responsible_id).aspects.push(value.area_aspect_name);
            }
        })
        if (responsibles.length > 0) {
            await emailToResponsibles(responsibles, auditInformation);
            return res.json({
                success: true
            })
        } else {
            return res.json({
                success: false,
                error: "No found responsible related with this item(Aspect). Please check Aspects."
            })
        }
    } catch (error) {
        next(error);        
    }
}

exports.getHistoricals = (req, res, next) => {
    const { document_item_id, area_aspect_id } = req.query;
    let sql = `SELECT *
        FROM audits a
        WHERE document_item_id = ${document_item_id} AND area_aspect_id = ${area_aspect_id}
        ORDER BY a.updatedAt DESC`
    db.sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(values => {
        res.send(values);
    }).catch(err => {
        next(err);
    })
}

const emailToResponsibles = async (responsibles, auditInfo) =>  {
    let message = "\n";
    auditInfo.forEach(audit => {
        message += `${audit.label}: ${audit.desc} \n`
    });
    message += "\n\n";
    return Promise.all(responsibles.map((responsible) => 
        email.send(responsible.email, "You received an email for Updated Follow-up", message + `Related Aspects: ${responsible.aspects.join(", ")}`)
    ))
}