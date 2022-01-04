const express = require('express');
const router = new express.Router();

const AdminRouter = require('./AdminRouter.js');
const GuestRouter = require('./GuestRouter.js');
const UserRouter = require('./UserRouter.js');

router.use('/admin', AdminRouter);
router.use('/user', UserRouter);
router.use('/', GuestRouter);

module.exports = router
