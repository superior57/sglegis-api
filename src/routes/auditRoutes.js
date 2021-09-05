const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditController');

router.get('/', controller.getAll);
router.post('/', controller.post);
router.put('/:audit_id', controller.post);
router.get('/query', controller.getQuery);
router.post('/responsibles/notify', controller.notifyResponsibles);
router.get('/historicals', controller.getHistoricals);

module.exports = router;