const { units_contacts } = require('../models');
const base = require('./baseController');

exports.getAll = (req, res, next) => {
    base.getAll(units_contacts, req, res, next);    
}

exports.get = (req, res, next) => {
    base.get(units_contacts, req, res, next, 'unit_contact_id');
};

exports.post = (req, res, next) => {
    base.insert(units_contacts, req, res, next);
}

exports.put = (req, res, next) => {
    base.update(units_contacts, req, res, next, 'unit_contact_id');
}

exports.delete = (req, res, next) => {
    base.delete(units_contacts, req, res, next, 'unit_contact_id');
}

