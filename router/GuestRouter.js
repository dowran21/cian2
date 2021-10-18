const express = require('express')
const router = new express.Router()

const GuestController = require('../controller/GuestController.js')

router.get('/languages', GuestController.Languages)
router.get('/:lang/all_real_estate', GuestController.AllRealEstate)
router.get('/:lang/categories_types', GuestController.TypeCategoryController)
router.get('/:lang/real_estates', GuestController.GetRealEstateByFilter)
router.get('/:lang/real_estate/:id', GuestController.GetRealEstateByID)

router.get('/:lang/types_of_category/:id', GuestController.GetTypesCategory)
router.get('/:lang/main_locations', GuestController.GetLocations)
router.get('/:lang/region_locations/:id', GuestController.GetRegions)

router.get('/:lang/paper/paper_types', GuestController.PaperTypes)
router.get('/:lang/paper/:paper_type_id', GuestController.PaperTypeController)
router.get('/:lang/paper/:id', GuestController.PaperByID)

router.get('/:lang/specifications_for_type/:type_id', GuestController.GetSpecificationsForType)
router.get('/:lang/not_required_specifications_for_type/:type_id', GuestController.GetNotRequiredSpecificationsForType)




module.exports = router