var express = require('express');
var router = express.Router();
var controller = require('../controllers/manage-account-student.controller');
var upload = require('../helpers/fileXlsx.helper');

// routes
router.get('/', controller.getAll);
// router.post('/authenticate', authenticate);
router.post('/create', controller.create);
router.get('/:_id', controller.getCurrent);
router.put('/:_id', controller.update);
router.post('/import', upload.single('fileExcel'), controller.importFile);
router.put('/export', controller.exportFile);
router.post('/find', controller.find);
router.delete('/:_id', controller._delete);

module.exports = router;