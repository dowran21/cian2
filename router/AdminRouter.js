const express = require('express')
const router = new express.Router()
const AdminController = require('../controller/AdminController.js')
const {resize_page_images} = require('../middleware/resize.js')
const {VerifyAdminAccessToken, VerifyAdminRefreshToken, VerifyIsAdmin} = require('../middleware/AuthMiddleware.js')
const Schema = require('../schemas/AdminSchema');
const {SchemaMiddleware, ParamsSchemaMiddleware, QuerySchemaMiddleware} = require('../middleware/SchemaMiddleware')
const upload = require('../middleware/upload')


router.post('/login', AdminController.AdminLogin)
router.get('/load-admin', VerifyAdminRefreshToken, AdminController.LoadAdmin )

router.post('/add-operator',VerifyAdminAccessToken, VerifyIsAdmin, SchemaMiddleware(Schema.AddOperator), AdminController.AddOperator)
router.post('/delete-operator/:id', ParamsSchemaMiddleware(Schema.IdSchema), VerifyAdminAccessToken, VerifyIsAdmin, AdminController.DeleteOperator)
router.post('/update-operator/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), SchemaMiddleware(Schema.UpdateOperator), AdminController.UpdateOperator)
router.get('/get-all-operators', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetOperators);
router.post('/change-operator-password/:id', VerifyAdminAccessToken, VerifyIsAdmin, SchemaMiddleware(Schema.ChangePassword), AdminController.ChangeOperatorPassword);

router.post('/add-specification', VerifyAdminAccessToken, VerifyIsAdmin, SchemaMiddleware(Schema.AddSpecification), AdminController.AddSpecification)
router.get('/get-specification/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.GetSpecificationByID)
router.get('/get-all-specifications', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetAllSpecifications)
router.post('/activation-of-specification/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.SpecificationActivation)
router.post('/disable-enable-spec-val/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.DisableEnableValue)
router.post('/add-spec-val/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.AddSpecVal)

router.post('/add-main-type', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.AddMaintype)
router.post('/add-type', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.AddType)

router.get('/all-types',VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetAllTypes)

router.get('/type/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.GetTypeByID)
router.get('/not-contained-spec/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.GetNotContainedSpec)
router.post('/add-specifications-to-type/:ctype_id', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.AddSpecificationToType)
router.post('/change-queue-position/:type_spec_id', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.ChangeQueuePosition )
router.post('/activation-type-specification/:type_spec_id', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.DeleteTypeSpecification)
router.post('/add-image-to-type/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), upload.single('picture'), resize_page_images, AdminController.AddTypeImage)

router.post('/update-real-estate/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.UpdateRealEstate)

router.post('/add-to-vip/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.AddToVIP)

router.post('/add-main-location', VerifyAdminAccessToken, VerifyIsAdmin, SchemaMiddleware(Schema.AddLocation),  AdminController.AddMainLocation)
router.post('/add-location/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), SchemaMiddleware(Schema.AddLocation), AdminController.AddLocation)
router.get('/main-locations',VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetLocations)
router.get('/region-locations/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.GetRegions)
router.post('/enable-location/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.ActivationOfLocation)
router.post('/update-location/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.UpdateLocation)

router.get('/page-image-places', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetImagePlaces)
router.get('/get-page-images/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.GetPageImages)
router.post('/add-page-image/:id',  VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), upload.single('picture'), resize_page_images,AdminController.UploadPageImages)
router.post('/delete-place-image/:id', VerifyAdminAccessToken, VerifyIsAdmin, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.DeleteImagePlace)

router.get('/all-real-estate-statistics', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetStatistics )
router.get('/get-all-types', VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetTypes)
router.get('/get-price-statistics',  VerifyAdminAccessToken, VerifyIsAdmin, AdminController.GetPriceStatistics)

router.get('/get-confirm-real-estates', VerifyAdminAccessToken,  AdminController.GetConfirmRealEstates)
router.get('/get-real-estate/:id', VerifyAdminAccessToken, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.RealestateByID )
router.post('/activation-real-estate/:id', VerifyAdminAccessToken, ParamsSchemaMiddleware(Schema.IdSchema), AdminController.ActivateRealEstate)
router.post('/get-confirm-vip', VerifyAdminAccessToken, AdminController.GetConfirmRealEstates)

module.exports = router