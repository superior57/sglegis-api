const { unites_contacts } = require('../models');
const base = require('./baseController');

exports.getAll = (req, res, next) => {
    base.getAll(unites_contacts, req, res, next);    
}

exports.get = (req, res, next) => {
    base.get(unites_contacts, req, res, next, 'unit_contact_id');
};

exports.post = (req, res, next) => {
    base.insert(unites_contacts, req, res, next);
}

exports.put = (req, res, next) => {
    base.update(unites_contacts, req, res, next, 'unit_contact_id');
}

exports.delete = (req, res, next) => {
    base.delete(unites_contacts, req, res, next, 'unit_contact_id');
}

