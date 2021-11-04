const express = require('express')
const router = new express.Router()
const OperatorController = require('../controller/OperatorController.js')
const {VerifyOperatorRefreshToken, VerifyOperatorAccessToken}= require('../middleware/AuthMiddleware')

router.post('/login', OperatorController.OperatorLogin)
router.get('/load-operator', VerifyOperatorRefreshToken, OperatorController.LoadOperator)

router.get('/get-confirm-real-estates', VerifyOperatorAccessToken, OperatorController.GetConfirmRealEstates)
router.get('/get-real-estate/:id', VerifyOperatorAccessToken, OperatorController.RealestateByID )
router.post('/activation-real-estate/:id', VerifyOperatorAccessToken, OperatorController.ActivateRealEstate)
router.post('/get-confirm-vip', VerifyOperatorAccessToken, OperatorController.GetConfirmRealEstates)

module.exports = router