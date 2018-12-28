var express = require('express');
var router = express.Router();
var controller = require('../controllers/manage-account-teacher.controller');
var upload = require('../helpers/fileXlsx.helper');
var middleware = require('../middlewares/authorization.middleware');

router.use(middleware.admin);

// routes
router.get('/', controller.getAll);
router.post('/create', controller.create);
router.get('/:_id', controller.getCurrent);
router.put('/:_id', controller.update);
router.post('/import', upload.single('fileExcel'), controller.importFile);
router.post('/export', controller.exportFile);
router.post('/find', controller.find);
router.delete('/:_id', controller._delete);

module.exports = router;