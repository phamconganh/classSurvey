var express = require('express');
var router = express.Router();
var controller = require('../controllers/manage-survey-class.controller');
var upload = require('../helpers/fileXlsx.helper');
var middleware = require('../middlewares/authorization.middleware');

// routes
router.get('/', middleware.adminOrTeacherOrStudent, controller.getAll);
router.post('/updateByImport', middleware.admin, upload.single('fileExcel'), controller.updateByImport);
router.get('/:_id', middleware.adminOrTeacherOrStudent, controller.getCurrent);
router.put('/update', middleware.admin, controller.update);
router.post('/import', middleware.admin, upload.single('fileExcel'), controller.importFile);
// router.post('/export', middleware.adminOrTeacherOrStudent, controller.exportFile);
router.post('/find', middleware.adminOrTeacherOrStudent, controller.find);
router.delete('/:id', middleware.admin, controller._delete);

module.exports = router;