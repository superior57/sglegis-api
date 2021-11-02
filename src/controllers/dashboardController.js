const { document_items } = require('../models');
const base = require('./baseController');
const db = require('../models/index');
const sequelize = require('sequelize');

exports.getCumulativeCompliance = (req, res, next) => {
    // - 

    let sql = `
    select
           count(1) as _count,
           count(1) * 100.0 / sum(count(1)) over() as _percentage,
           getConformity(ai.audit_conformity) as _labels
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    group by ai.audit_conformity
    `
    //req.query.fields = [{ fields: 'customer_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
}

exports.getPraticalOrderCompliance = (req, res, next) => {
    let sql = `
    select
           count(1) as _count,
           count(1) * 100.0 / sum(count(1)) over() as _percentage,
           getConformity(ai.audit_conformity) as _labels
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    where audit_practical_order = 2 /* PRATICAL ORDER = SIM*/
    group by ai.audit_conformity
    `

    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
}


exports.getResponsibleByConformity = (req, res, next) => {
    //     -- responsável por não conformidade (%)

    let sql = ` 
    select
        count(1) as _count,
        count(1) * 100.0 / sum(count(1)) over() as _percentage,
        COALESCE(uar.unit_aspect_responsible_name, NULL, 'SEM RESPONSÁVEL') as _labels
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    left join items_areas_aspects iaa on a.item_area_aspect_id = iaa.item_area_aspect_id
    left join responsibles_aspects ra on iaa.area_aspect_id = ra.area_aspect_id
    left join units_aspects_responsibles uar on ra.unit_aspect_responsible_id = uar.unit_aspect_responsible_id
    where ai.audit_practical_order = 2 and ai.audit_conformity = 4 /* Pratical order = SIM e Conformidade = NAO */
            and iaa.area_id = 3
    group by
            uar.unit_aspect_responsible_name
    `
    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
};

exports.getGeneralCompliance = (req, res, next) => {
    // - compliance geral (aplicável = SIM e compliance SIM / NAO) (%)

    let sql = ` 
    SELECT
               count(1) as _count,
               count(1) * 100.0 / sum(count(1)) over() as _percentage,
               COALESCE(unit_aspect_responsible_name, NULL, 'SEM RESPONSÁVEL') as _labels
        FROM documents d
        INNER JOIN document_items di ON d.document_id = di.document_id
        INNER JOIN items_areas_aspects iaa ON di.document_item_id = iaa.document_item_id
        INNER JOIN areas_aspects aa ON iaa.area_aspect_id = aa.area_aspect_id
        INNER JOIN document_scopes ds ON d.document_scope_id = ds.document_scope_id
    INNER JOIN (
            SELECT
                    cu.customer_id, cu.customer_unit_id, cu.customer_unit_uf_id, cu.customer_unit_city_id,
                    uaa.area_id, uaa.area_aspect_id, cu.customer_unit_name, cs.customer_business_name, cs.customer_group_id,
                    uar.unit_aspect_responsible_name, uar.unit_aspect_responsible_email
            FROM customers_units cu
            INNER JOIN units_areas_aspects uaa ON cu.customer_unit_id = uaa.customer_unit_id
            INNER JOIN customers cs ON cu.customer_id = cs.customer_id
            LEFT JOIN (
            	/* RESPONSIBLES PER UNIT AND ASPECTS */
				 select
				 	uar.customer_unit_id,
				 	ra.area_aspect_id,
				 	GROUP_CONCAT(uar.unit_aspect_responsible_name SEPARATOR ';') AS unit_aspect_responsible_name,
				 	GROUP_CONCAT(uar.unit_aspect_responsible_email SEPARATOR ';') AS unit_aspect_responsible_email
				 from units_aspects_responsibles uar
				 inner join responsibles_aspects ra on uar.unit_aspect_responsible_id = ra.unit_aspect_responsible_id
				 GROUP BY uar.customer_unit_id, ra.area_aspect_id
            ) uar ON uar.customer_unit_id = cu.customer_unit_id and uar.area_aspect_id = uaa.area_aspect_id
        ) unit_data ON
        (d.document_scope_id = 4 /*MUNICIPAL*/ AND d.document_city_id = unit_data.customer_unit_city_id AND unit_data.area_aspect_id = iaa.area_aspect_id AND unit_data.area_id = iaa.area_id) OR
        (d.document_scope_id = 3 /*ESTADUAL*/ AND d.document_state_id = unit_data.customer_unit_uf_id AND unit_data.area_aspect_id = iaa.area_aspect_id AND unit_data.area_id = iaa.area_id) OR
        ((d.document_scope_id = 1 OR d.document_scope_id = 2)/*FEDERAL ou GLOBAL*/ AND iaa.area_aspect_id = unit_data.area_aspect_id AND unit_data.area_id = iaa.area_id)
    GROUP BY unit_aspect_responsible_name
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
        aa.area_aspect_name as _labels
    from audits a
    inner join audit_items ai on a.audit_id = ai.audits_audit_id
    inner join items_areas_aspects iaa on a.item_area_aspect_id = iaa.item_area_aspect_id
    inner join areas_aspects aa on iaa.area_aspect_id = aa.area_aspect_id
    where ai.audit_practical_order = 2 and ai.audit_conformity = 4 /* Pratical order = SIM e Conformidade = NAO */
            and aa.area_id = 3
    group by
            iaa.area_aspect_id
    `
    // req.query.fields = [{ fields: 'document_id', ops: 'eq', values: req.params.id }]
    base.rawquery(sql, req, res, next);
};