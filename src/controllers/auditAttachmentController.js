const { audit_attachments } = require('../models');
const base = require('./baseController');
const file = require('../middleware/file');



exports.getAll = (req, res, next) => {
    base.getAll(audit_attachments, req, res, next);    
}

exports.get = (req, res, next) => {
    base.get(audit_attachments, req, res, next, 'audit_attachment_id');
};

exports.getAttachments = (req, res, next) => {
    base.get(audit_attachments, req, res, next, 'audit_id');
};

exports.post = (req, res, next) => {
    // file.setFolder('audits');

    req.body.audit_attachment_src = `${String(req.file.destination)}audits/${req.file.filename}`;
    base.insert(audit_attachments, req, res, next);
}

exports.delete = (req, res, next) => {
    base.delete(audit_attachments, req, res, next, 'audit_attachment_id');
}

