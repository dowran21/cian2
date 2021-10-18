const express = require('express')
const router = new express.Router()
const AdminRouter = require('./AdminRouter')
const GuestRouter = require('./GuestRouter')
const UserRouter = require('./UserRouter')


router.use('/admin', AdminRouter )
router.use('/user', UserRouter)
router.use('', GuestRouter)

module.exports = router