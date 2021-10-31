const express = require('express')
const router = new express.Router()
const UserController = require('../controller/UserController.js')
const upload = require('../middleware/upload.js')
const {SchemaMiddleware} = require('../middleware/SchemaMiddleware.js')
const Schema = require('../schemas/UserSchema.js')
const {resize_image} = require('../middleware/resize')
const { VerifyUserAccessToken, VerifyCodeAccessToken } = require('../middleware/AuthMiddleware.js')


router.post('/registration', SchemaMiddleware(Schema.Registration), UserController.UserRegistration)
router.post('/login', SchemaMiddleware(Schema.Login), UserController.UserLogin)
router.post('/verify-code', VerifyCodeAccessToken, UserController.VerifyUserCode)
router.post('/send-code-again', VerifyCodeAccessToken, UserController.SendCodeAgain)
router.post('/forgot-password', UserController.ForgotPassword)
router.post('/change-password', VerifyUserAccessToken, UserController.ChangePassword)


router.post('/:lang/add-real-estate', VerifyUserAccessToken, SchemaMiddleware(Schema.Real_estate), UserController.AddRealEstate)


router.get('/:lang/user-real-estates', VerifyUserAccessToken,  UserController.UserRealEstates)
router.get('/:lang/user-real-estate/:id', VerifyUserAccessToken, UserController.GetUserRealEstateByID)
router.post('/:lang/add-real-estate-images/:id',VerifyUserAccessToken, upload.array("picture", 15), resize_image, UserController.AddImage )
router.post('/:lang/update-real-estate/:id', VerifyUserAccessToken, UserController.UpateRealEstate)


router.post('/:lang/add-to-vip/:id', VerifyUserAccessToken, UserController.AddToVIP)
router.get('/:lang/get-wish-list', VerifyUserAccessToken, UserController.GetWishList)
router.post('/:lang/add-to-wish-list/:id', VerifyUserAccessToken, UserController.AddWishList)

module.exports = router