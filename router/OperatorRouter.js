const express = require('express')
const router = new express.Router()
const OperatorController = require('../controller/OperatorController.js')
const OperatorHelper = require('../middleware/AuthMiddleware')

router.post('/login', OperatorController.OperatorLogin)
router.get('/load-operator', OperatorHelper.VerifyOperatorRefreshToken, OperatorController.LoadOperator)

router.get('/get-confirm-real-estates', OperatorHelper.VerifyOperatorAccessToken, OperatorController.GetConfirmRealEstates)
router.get('/get-real-estate/:id', OperatorHelper.VerifyOperatorAccessToken, OperatorController.RealestateByID )
router.post('/activation-real-estate/:id', OperatorHelper.VerifyOperatorAccessToken, OperatorController.ActivateRealEstate)

module.exports = router