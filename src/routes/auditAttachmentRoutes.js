const express = require('express');
const router = express.Router();
const controller = require('../controllers/auditAttachmentController');
const file = require('../middleware/file');

// file.setFolder('audits');

router.post('/', file.fileUploader.single('attachment_file'),  controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.get('/attachments/:id', controller.getAttachments);
router.delete('/:id', controller.delete);

module.exports = router;