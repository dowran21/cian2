const express = require('express')
const router = new express.Router()
const {QuerySchemaMiddleware, ParamsSchemaMiddleware} = require('../middleware/SchemaMiddleware')
const Schema = require('../schemas/UserSchema')

const GuestController = require('../controller/GuestController.js')

router.get('/languages', GuestController.Languages)
router.get('/:lang/all-real-estates', ParamsSchemaMiddleware(Schema.LangSchema), QuerySchemaMiddleware(Schema.RealEstateFilter), GuestController.AllRealEstate)
router.get('/:lang/categories-types', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.TypeCategoryController)
router.get('/:lang/real-estate/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetRealEstateByID)
router.get('/:lang/get-filter-count', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.CountForFilter)

router.get('/:lang/flat-filter', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.FlatFilter)
router.get('/:lang/type-images/:main_type_id', ParamsSchemaMiddleware(Schema.LangSchema), ParamsSchemaMiddleware(Schema.MainTypeSchema), GuestController.TypeImages)

router.get('/:lang/types/:cat_id/:main_id', ParamsSchemaMiddleware(Schema.MainTypeMult), GuestController.GetTypesCategory)
router.get('/:lang/main-locations', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.GetLocations)
router.get('/:lang/region-locations/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetRegions)

router.post('/:lang/get-wish-list', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.GetWishList)

// router.get('/:lang/types', GuestController.GetTypes)

router.get('/room-specification', GuestController.RoomSpecController)

router.get('/:lang/specifications-for-type/:type_id/:category_id', ParamsSchemaMiddleware(Schema.CategoryTypeSchema),  GuestController.GetSpecificationsForType)
// router.get('/:lang/spec-for-type-search/:type_id', ParamsSchemaMiddleware(Schema.LangSchema),  GuestController.GetSpecForTypeSearch)
// router.get('/:lang/not-required-specifications-for-type/:type_id', ParamsSchemaMiddleware(Schema.LangSchema), ParamsSchemaMiddleware(Schema.TypeSchema), GuestController.GetNotRequiredSpecificationsForType)



module.exports = router