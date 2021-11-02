const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');


router.get('/cumulative_compliance', controller.getCumulativeCompliance);
router.get('/pratical_order_compliance', controller.getPraticalOrderCompliance);
router.get('/general_compliance', controller.getGeneralCompliance);
router.get('/responsible_conformity', controller.getResponsibleByConformity);
router.get('/responsible_aspect', controller.getResponsibleByAspect);

module.exports = router;