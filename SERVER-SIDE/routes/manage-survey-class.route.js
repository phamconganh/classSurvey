var express = require('express');
var router = express.Router();
var controller = require('../controllers/manage-survey-class.controller');
var upload = require('../helpers/fileXlsx.helper');

router.use(function(req, res, next){
    req.param = {
        permission: 0,
        code: "thanhld"
    }
	// if(typeof req.objectType !== 'undefined'){
	//     objectType = req.objectType;  
    // } else{
	//     objectType = config.viewer;
    // }
    next();  
})

// // routes
router.get('/', controller.getAll);
// // router.post('/authenticate', authenticate);
router.post('/updateByImport', upload.single('fileExcel'), controller.updateByImport);
router.get('/:_id', controller.getCurrent);
router.put('/update', controller.update);
router.post('/import', upload.single('fileExcel'), controller.importFile);
// router.post('/export', controller.exportFile);
router.post('/find', controller.find);
router.delete('/:id', controller._delete);

module.exports = router;