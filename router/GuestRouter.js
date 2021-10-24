const express = require('express')
const router = new express.Router()

const GuestController = require('../controller/GuestController.js')

router.get('/languages', GuestController.Languages)
router.get('/:lang/all-real-estates', GuestController.AllRealEstate)
router.get('/:lang/categories-types', GuestController.TypeCategoryController)
router.get('/:lang/real-estates', GuestController.GetRealEstateByFilter)
router.get('/:lang/real-estate/:id', GuestController.GetRealEstateByID)
router.get('/:lang/get-filter-count', GuestController.CountForFilter)

router.get('/:lang/types-of-category/:id', GuestController.GetTypesCategory)
router.get('/:lang/main-locations', GuestController.GetLocations)
router.get('/:lang/region-locations/:id', GuestController.GetRegions)

router.get('/:lang/specifications-for-type/:type_id', GuestController.GetSpecificationsForType)
router.get('/:lang/not-required-specifications-for-type/:type_id', GuestController.GetNotRequiredSpecificationsForType)

module.exports = router