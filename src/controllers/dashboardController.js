const { document_items } = require('../models');
const base = require('./baseController');
const db = require('../models/index');
const sequelize = require('sequelize');

exports.getGeneralCompliance = (req, res, next) => {
    // - compliance geral (aplicável = SIM e compliance SIM / NAO) (%)

    let sql = ` 
    select
        count(1) as _count,
        count(1) * 100.0 / sum(count(1)) over() as _percentage,
        ai.audit_conformity,
        getConformity(ai.audit_conformity) as conformity_desc
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    where ai.audit_practical_order = 2
    group by ai.audit_conformity
    `
    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
};

exports.getResponsibleByConformity = (req, res, next) => {
    //     -- responsável por não conformidade (%)

    let sql = ` 
    select
        count(1) as _count,
        count(1) * 100.0 / sum(count(1)) over() as _percentage,
        uar.unit_aspect_responsible_name
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    inner join items_areas_aspects iaa on a.item_area_aspect_id = iaa.item_area_aspect_id
    left join responsibles_aspects ra on iaa.area_aspect_id = ra.area_aspect_id
    left join units_aspects_responsibles uar on ra.unit_aspect_responsible_id = uar.unit_aspect_responsible_id
    where
        ai.audit_conformity = 4 or ai.audit_conformity = 6 /*conformidade nao ou parcial*/
    group by uar.unit_aspect_responsible_name
    `
    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
};

exports.getResponsibleByAspect = (req, res, next) => {
    // -- responsável por aspecto (%)

    let sql = ` 
    select
           count(1) as _count,
           count(1) * 100.0 / sum(count(1)) over() as _percentage,
           uar.unit_aspect_responsible_name
    from units_aspects_responsibles uar
    inner join responsibles_aspects ra on uar.unit_aspect_responsible_id = ra.unit_aspect_responsible_id
    inner join areas_aspects aa on ra.area_aspect_id = aa.area_aspect_id
    group by uar.unit_aspect_responsible_name
    `
    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
};