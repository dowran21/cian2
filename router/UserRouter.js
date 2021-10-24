const express = require('express')
const router = new express.Router()
const UserController = require('../controller/UserController.js')
const upload = require('../middleware/upload.js')
const {SchemaMiddleware} = require('../middleware/SchemaMiddleware.js')
const Schema = require('../schemas/UserSchema.js')
const {resize_image} = require('../middleware/resize')
const { VerifyUserAccessToken } = require('../middleware/AuthMiddleware.js')


router.post('/registration', UserController.UserRegistration)
router.post('/login', UserController.UserLogin)

router.post('/:lang/add-real-estate', VerifyUserAccessToken, SchemaMiddleware(Schema.Real_estate), UserController.AddRealEstate)

router.get('/:lang/user_real_estates', VerifyUserAccessToken,  UserController.UserRealEstates)
router.get('/:lang/user_real_estate/:id', VerifyUserAccessToken, UserController.GetUserRealEstateByID)
router.put('/:lang/real_estate/:id', VerifyUserAccessToken,  UserController.UpdateRealEstate)
router.post('/:lang/add-real-estate-images/:id', VerifyUserAccessToken, upload.array("picture", 15), resize_image, UserController.AddImage )
router.post('/:lang/update_real_estate/:id', VerifyUserAccessToken, UserController.UpateRealEstate)

router.post('/:lang/add_to_vip/:id', VerifyUserAccessToken, UserController.AddToVIP)
router.get('/:lang/get_wish_list', VerifyUserAccessToken, UserController.GetWishList)
router.post('/:lang/add_to_wish_list/:id', VerifyUserAccessToken, UserController.AddWishList)

module.exports = router