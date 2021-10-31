const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');


router.get('/cumulative_compliance', controller.getCumulativeCompliance);
router.get('/general_compliance', controller.getGeneralCompliance);
router.get('/responsible_aspect', controller.getResponsibleByAspect);
router.get('/responsible_conformity', controller.getResponsibleByConformity);

module.exports = router;