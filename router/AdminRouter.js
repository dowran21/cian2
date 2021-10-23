const express = require('express')
const router = new express.Router()
const AdminController = require('../controller/AdminController.js')
const upload = require('../middleware/upload.js')
const {VerifyAdminAccessToken} = require('../middleware/AuthMiddleware.js')

router.post('/login', AdminController.AdminLogin)


router.post('/add-operator',VerifyAdminAccessToken, AdminController.AddOperator)
router.post('/add-specification', VerifyAdminAccessToken, AdminController.AddSpecification)

router.get('/specifications/:id', VerifyAdminAccessToken, AdminController.GetSpecificationByID)
router.get('/all-specifications', VerifyAdminAccessToken, AdminController.GetAllSpecifications)

router.post('/add-main-type', VerifyAdminAccessToken, AdminController.AddMaintype)
router.post('/add-type', VerifyAdminAccessToken, AdminController.AddType)

router.get('/all-types',VerifyAdminAccessToken, AdminController.GetAllTypes)
router.get('/type/:id', VerifyAdminAccessToken, AdminController.GetTypeByID)

router.post('/add-specifications-to-type/:type_id', VerifyAdminAccessToken, AdminController.AddSpecificationToType)

router.post('/update-real-estate/:id', VerifyAdminAccessToken, AdminController.UpdateRealEstate)

router.post('/add-to-vip/:id', VerifyAdminAccessToken, AdminController.AddToVIP)

router.post('/add-main-location', VerifyAdminAccessToken, AdminController.AddMainLocation)
router.post('/add-location', VerifyAdminAccessToken, AdminController.AddLocation)


module.exports = router