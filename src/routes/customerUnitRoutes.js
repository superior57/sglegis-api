const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerUnitController');
const controllerAreaAspect = require('../controllers/unitAreaAspectController');
const controllerResponsible = require('../controllers/unitAspectResponsibleController');
const controllerResponsibleAspect = require('../controllers/responsibleAspectController');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/query', controller.getQuery);
router.get('/:id', controller.get);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);
router.get('/:id/aspects', controller.getAreasAspects);


router.get('/:id/aspectsonly', controllerAreaAspect.get);
router.post('/:id/aspects', controllerAreaAspect.post);
router.delete('/:id/aspects/:unit_area_aspect_id', controllerAreaAspect.delete);

router.get('/:id/responsibles', controllerResponsible.get);
router.post('/responsibles', controllerResponsible.post);
router.delete('/responsibles/:id', controllerResponsible.delete);

router.post('/responsibleaspects', controllerResponsibleAspect.post);

module.exports = router;