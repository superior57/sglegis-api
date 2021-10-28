const express = require('express');
const router = express.Router();
const version = "v1";

router.use(`/${version}/menu/`, require('./menuRoutes'));
router.use(`/${version}/state/`, require('./stateRoutes'));
router.use(`/${version}/city/`, require('./cityRoutes'));
router.use(`/${version}/customergroup/`, require('./customerGroupsRoutes'));
router.use(`/${version}/customer/`, require('./customerRoutes'));
router.use(`/${version}/customerunit/`, require('./customerUnitRoutes'));
router.use(`/${version}/unitcontact/`, require('./unitContactRoutes'));
router.use(`/${version}/area/`, require('./areaRoutes'));
router.use(`/${version}/areaaspect/`, require('./areaAspectRoutes'));
router.use(`/${version}/cep/`, require('./cepRoutes'));
router.use(`/${version}/documentscope/`, require('./documentScopeRoutes'));
router.use(`/${version}/documentstatus/`, require('./documentStatusRoutes'));
router.use(`/${version}/document/`, require('./documentRoutes'));
router.use(`/${version}/documentitem/`, require('./documentItemRoutes'));
router.use(`/${version}/document-attachment/`, require('./documentAttachmentRoutes'));
router.use(`/${version}/praticalorder/`, require('./praticalOrdersRoutes'));
router.use(`/${version}/conformity/`, require('./conformityRoutes'));
router.use(`/${version}/requirements/`, require('./requirementsRouter'));
router.use(`/${version}/users/`, require('./userRoutes'));
router.use(`/${version}/audits/`, require('./auditRoutes'));
router.use(`/${version}/action-plan/`, require('./actionPlanRoutes'));
router.use(`/${version}/audit-attachment/`, require('./auditAttachmentRoutes'));
router.use(`/${version}/dashboard/`, require('./dashboardRouter'));

module.exports = router;