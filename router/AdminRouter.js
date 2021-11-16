const express = require('express')
const router = new express.Router()
const AdminController = require('../controller/AdminController.js')
const {resize_page_images} = require('../middleware/resize.js')
const {VerifyAdminAccessToken, VerifyAdminRefreshToken} = require('../middleware/AuthMiddleware.js')
const Schema = require('../schemas/AdminSchema');
const {SchemaMiddleware} = require('../middleware/SchemaMiddleware')
const upload = require('../middleware/upload')


router.post('/login', AdminController.AdminLogin)
router.get('/load-admin', VerifyAdminRefreshToken, AdminController.LoadAdmin )

router.post('/add-operator',VerifyAdminAccessToken, SchemaMiddleware(Schema.AddOperator), AdminController.AddOperator)
router.post('/delete-operator/:id', VerifyAdminAccessToken, SchemaMiddleware(Schema.UpdateOperator), AdminController.DeleteOperator)
router.post('/update-operator/:id', VerifyAdminAccessToken, AdminController.UpdateOperator)
router.get('/get-deleted-operators', VerifyAdminAccessToken, AdminController.GetDeletedOperators)
router.post('/recover-operator/:id', VerifyAdminAccessToken, AdminController.RecoveryOperator)
router.get('/get-all-operators', VerifyAdminAccessToken, AdminController.GetOperators)

router.post('/add-specification', VerifyAdminAccessToken, AdminController.AddSpecification)
router.get('/get-specification/:id', VerifyAdminAccessToken, AdminController.GetSpecificationByID)
router.get('/get-all-specifications', VerifyAdminAccessToken, AdminController.GetAllSpecifications)
router.post('/activation-of-specification/:id', VerifyAdminAccessToken, AdminController.SpecificationActivation)
router.post('/disable-enable-spec-val/:id', VerifyAdminAccessToken, AdminController.DisableEnableValue)
router.post('/add-spec-val/:id', VerifyAdminAccessToken, AdminController.AddSpecVal)

router.post('/add-main-type', VerifyAdminAccessToken, AdminController.AddMaintype)
router.post('/add-type', VerifyAdminAccessToken, AdminController.AddType)

router.get('/all-types',VerifyAdminAccessToken, AdminController.GetAllTypes)

router.get('/type/:id', VerifyAdminAccessToken, AdminController.GetTypeByID)
router.get('/not-contained-spec/:id', VerifyAdminAccessToken, AdminController.GetNotContainedSpec)
router.post('/add-specifications-to-type/:ctype_id', VerifyAdminAccessToken, AdminController.AddSpecificationToType)
router.post('/activation-type-specification/:ts_id', VerifyAdminAccessToken, AdminController.DeleteTypeSpecification)
router.post('/add-image-to-type/:id', VerifyAdminAccessToken, upload.single('picture'), resize_page_images, AdminController.AddTypeImage)

router.post('/update-real-estate/:id', VerifyAdminAccessToken, AdminController.UpdateRealEstate)

router.post('/add-to-vip/:id', VerifyAdminAccessToken, AdminController.AddToVIP)

router.post('/add-main-location', VerifyAdminAccessToken, AdminController.AddMainLocation)
router.post('/add-location', VerifyAdminAccessToken, AdminController.AddLocation)
router.get('/main-locations',VerifyAdminAccessToken, AdminController.GetLocations)
router.get('/region-locations/:id', VerifyAdminAccessToken, AdminController.GetRegions)

router.get('/page-image-places', VerifyAdminAccessToken, AdminController.GetImagePlaces)
router.get('/get-page-images/:id', VerifyAdminAccessToken, AdminController.GetPageImages)
router.post('/add-page-image/:id', upload.single('picture'), resize_page_images, VerifyAdminAccessToken, AdminController.UploadPageImages)
router.post('/delete-place-image/:id', VerifyAdminAccessToken, AdminController.DeleteImagePlace)

router.get('/all-real-estate-statistics', VerifyAdminAccessToken, AdminController.GetStatistics )
router.get('/get-all-types', VerifyAdminAccessToken, AdminController.GetTypes)

module.exports = router