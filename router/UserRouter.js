const express = require('express')
const router = new express.Router()
const UserController = require('../controller/UserController.js')
const upload = require('../middleware/upload.js')
const {SchemaMiddleware, QuerySchemaMiddleware, ParamsSchemaMiddleware} = require('../middleware/SchemaMiddleware.js')
const Schema = require('../schemas/UserSchema.js')
const {resize_image} = require('../middleware/resize')
const { VerifyUserAccessToken, VerifyCodeAccessToken, VerifyUserRefreshToken, VerifyEstateUser, CheckLastLogged } = require('../middleware/AuthMiddleware.js')


router.post('/registration', SchemaMiddleware(Schema.Registration), UserController.UserRegistration)
router.post('/login', SchemaMiddleware(Schema.Login), UserController.UserLogin)
router.post('/verify-code', VerifyCodeAccessToken, UserController.VerifyUserCode)
router.post('/send-code-again', VerifyCodeAccessToken, UserController.SendCodeAgain)
router.post('/forgot-password', UserController.ForgotPassword)
router.post('/change-password', VerifyCodeAccessToken, UserController.ChangePassword)
router.get('/load-user', VerifyUserRefreshToken, UserController.LoadUser)
router.post('/update-user', VerifyUserAccessToken, CheckLastLogged, UserController.UpdateUser)
router.post('/send-code', VerifyUserAccessToken, CheckLastLogged,  UserController.SendCode)

router.post('/:lang/add-real-estate', ParamsSchemaMiddleware(Schema.LangSchema), VerifyUserAccessToken, CheckLastLogged, SchemaMiddleware(Schema.Real_estate), UserController.AddRealEstate)


router.get('/:lang/user-real-estates',  ParamsSchemaMiddleware(Schema.LangSchema), VerifyUserAccessToken, CheckLastLogged,  UserController.UserRealEstates)
router.get('/:lang/user-real-estate/:id', ParamsSchemaMiddleware(Schema.IDSchema), VerifyUserAccessToken, CheckLastLogged, UserController.GetUserRealEstateByID)
router.post('/:lang/add-real-estate-images/:id', ParamsSchemaMiddleware(Schema.IDSchema), VerifyUserAccessToken, CheckLastLogged, VerifyEstateUser, upload.array("picture", 15), resize_image, UserController.AddImage )
router.post('/:lang/update-real-estate/:id', VerifyUserAccessToken, CheckLastLogged, UserController.UpateRealEstate)
router.post('/:lang/delete-image/:id', VerifyUserAccessToken, CheckLastLogged, UserController.DeleteImage)
router.post('/:lang/remove-real-estate/:id', VerifyUserAccessToken, CheckLastLogged, UserController.RemoveRealEstate)

router.post('/:lang/add-to-vip/:id', VerifyUserAccessToken, CheckLastLogged, UserController.AddToVIP)
router.get('/:lang/get-wish-list', VerifyUserAccessToken, CheckLastLogged, UserController.GetWishList)
router.post('/:lang/add-to-wish-list/:id', VerifyUserAccessToken, CheckLastLogged, UserController.AddWishList)
router.post('/:lang/add-to-wish-list-mobile', VerifyUserAccessToken, CheckLastLogged, UserController.AddToWishListMobile)
router.post('/:lang/drop-wish-list', VerifyUserAccessToken, CheckLastLogged, UserController.DropWishList);
router.post('/:lang/remove-from-wish-list/:id', VerifyUserAccessToken, CheckLastLogged, UserController.RemoveFromWishList)

router.post('/:lang/make-complaint/:id', VerifyUserAccessToken, CheckLastLogged, UserController.MakeComplaint)
router.get('/:lang/get-notifications', VerifyUserAccessToken, CheckLastLogged, UserController.GetNotifications)
router.post('/:lang/update-notification/:id', VerifyUserAccessToken, CheckLastLogged, UserController.UpdateNotification)

router.post('/:lang/delete-myself/:id', VerifyUserAccessToken, UserController.DeleteMyself)

module.exports = router