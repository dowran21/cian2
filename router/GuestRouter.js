const express = require('express')
const router = new express.Router()
const {QuerySchemaMiddleware, ParamsSchemaMiddleware} = require('../middleware/SchemaMiddleware')
const Schema = require('../schemas/UserSchema');
const {VerifyUserAccessTokenNext} = require('../middleware/AuthMiddleware')

const GuestController = require('../controller/GuestController.js')

router.get('/languages', GuestController.Languages)
router.get('/:lang/all-real-estates', ParamsSchemaMiddleware(Schema.LangSchema),   GuestController.AllRealEstate)
router.get('/:lang/categories-types', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.TypeCategoryController)
router.get('/:lang/real-estate/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetRealEstateByID)
router.get('/:lang/user-real-estates/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetUserRealEstates )
router.get('/:lang/get-filter-count', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.CountForFilter)


router.get('/:lang/get-real-estate-positions', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.RealEstatePositions)
router.get('/:lang/flat-filter', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.FlatFilter)
router.get('/:lang/commerce-filter', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.CommerceFilter)
router.get('/:lang/type-images/:main_type_id', ParamsSchemaMiddleware(Schema.LangSchema), ParamsSchemaMiddleware(Schema.MainTypeSchema), GuestController.TypeImages)

router.get('/:lang/types/:cat_id/:main_id', ParamsSchemaMiddleware(Schema.MainTypeMult), GuestController.GetTypesCategory)
router.get('/:lang/main-locations', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.GetLocations)
router.get('/:lang/region-locations/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetRegions)

router.post('/:lang/get-wish-list', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.GetWishList)
router.get('/:lang/get-types-count/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetCountOfCategory)

router.get('/room-specification', GuestController.RoomSpecController)
router.get('/:lang/types-of-category/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetTypesOfCategory)
router.get('/:lang/get-specification/:id', ParamsSchemaMiddleware(Schema.IDSchema), GuestController.GetSpecByID)
router.post('/:lang/get-history-view', ParamsSchemaMiddleware(Schema.LangSchema), GuestController.GetHistoryView)

router.get('/:lang/specifications-for-type/:type_id/:category_id', ParamsSchemaMiddleware(Schema.CategoryTypeSchema),  GuestController.GetSpecificationsForType)
router.get('/:lang/specifications-for-types/:category_id', GuestController.GetSpecificationsForTypes)
router.get('/:lang/required-specifications-for-types/:category_id', GuestController.GetRequiredSpecificationsForTypes)
router.get('/:lang/not-required-specifications-for-types/:category_id', GuestController.GetNotRequiredSpecificationsForTypes)

router.get('/:lang/get-notifies', GuestController.GetNotifies)
router.get('/page-images/:id', GuestController.GetImagePlaceRandom)

router.get('/room-filters', GuestController.GetTypesForRooms)

module.exports = router