const express = require('express')
const router = new express.Router()
const AdminController = require('../controller/AdminController.js')
const upload = require('../middleware/upload.js')


router.post('/add_specifications', AdminController.AddSpecification)
router.get('/specifications/:id', AdminController.GetSpecificationByID)
router.get('/all_specifications', AdminController.GetAllSpecifications)

router.get('/all_types', AdminController.GetAllTypes)
router.post('/add_type', AdminController.AddType)
router.get('/type/:id', AdminController.GetTypeByID)
router.post('/add_specifications_to_type/:type_id', AdminController.AddSpecificationToType)

router.post('/update_real_estate/:id', AdminController.UpdateRealEstate)

router.get('/not-activated-descriptions', AdminController.GetDeactivatedDescriptions)
router.post('/activate-real-estate-descriptions/:id', AdminController.ActivateRealEstateDescriptions)


router.post('/activate-real-estate-images/:id', AdminController.ActivateRealEstateImages)
router.get('/not-activated-images', AdminController.GetDeactivatedImages)

router.post('/add_to_vip/:id', AdminController.AddToVIP)

router.post('/add_location', AdminController.AddLocation)

module.exports = router
