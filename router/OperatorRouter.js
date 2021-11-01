const express = require('express')
const router = new express.Router()
const OperatorController = require('../controller/OperatorController.js')

router.post('/login', OperatorController.OperatorLogin)


module.exports = router