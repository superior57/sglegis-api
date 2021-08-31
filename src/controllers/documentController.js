const { documents } = require('../models');
const base = require('./baseController');

exports.getAll = (req, res, next) => {
    //base.getAll(documents, req, res, next);    
    getQuery(req, res, next);
}

const getQuery = (req, res, next) => {
    const query = {};
    Object.keys(req.query).forEach(key => {
        if (req.query[key] !== "" && req.query[key] != 'null' && req.query[key] != null ) {
            query[key] = req.query[key]
        }
    })

    let sql = `
    select 
    CONCAT(d.document_type, ' ', d.document_number) concat_type_number,
	d.document_id, d.document_type, d.document_number, d.document_date, d.document_summary, d.document_state_id, d.document_city_id,
	ds.document_scope_id, ds.document_scope_description,
	d.document_status_id, ds2.status_description 
    from documents d
    inner join document_scopes ds on d.document_scope_id = ds.document_scope_id 
    inner join document_status ds2 on d.document_status_id = ds2.status_id
    `;


    console.log(sql);
   
    base.rawquery(sql, req, res, next);
}


exports.get = (req, res, next) => {
    base.get(documents, req, res, next, 'document_id');
};

exports.post = (req, res, next) => {
    base.insert(documents, req, res, next);
}

exports.put = (req, res, next) => {
    base.update(documents, req, res, next, 'document_id');
}

exports.delete = (req, res, next) => {
    base.delete(documents, req, res, next, 'document_id');
}

