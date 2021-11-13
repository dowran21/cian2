const express = require('express')
const router = new express.Router()

const GuestController = require('../controller/GuestController.js')

router.get('/languages', GuestController.Languages)
router.get('/:lang/all-real-estates', GuestController.AllRealEstate)
router.get('/:lang/categories-types', GuestController.TypeCategoryController)
router.get('/:lang/real-estate/:id', GuestController.GetRealEstateByID)
router.get('/:lang/get-filter-count', GuestController.CountForFilter)
router.get('/:lang/flat-filter', GuestController.FlatFilter)

router.get('/:lang/types-of-category/:id', GuestController.GetTypesCategory)
router.get('/:lang/main-locations', GuestController.GetLocations)
router.get('/:lang/region-locations/:id', GuestController.GetRegions)

router.post('/get-wish-list', GuestController.GetWishList)


router.get('/:lang/specifications-for-type/:type_id', GuestController.GetSpecificationsForType)
router.get('/:lang/spec-for-type-search/:type_id', GuestController.GetSpecForTypeSearch)
router.get('/:lang/not-required-specifications-for-type/:type_id', GuestController.GetNotRequiredSpecificationsForType)

module.exports = router