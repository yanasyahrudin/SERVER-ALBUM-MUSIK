const express = require('express')
const CartController = require('../controllers/cartController')
const authenticationUser = require('../middlewares/auth')
const router = express.Router()

router.use(authenticationUser)

router.get('/', CartController.fetchCarts)
router.post('/:id', CartController.addCart)

module.exports = router