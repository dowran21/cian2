const express = require('express');
const router = new express.Router();
const GuestController = require('../controllers/GuestController')



router.get('/:lang/get-categories', GuestController.GetCategories)



module.exports = router;