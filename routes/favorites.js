const express = require('express')
const FavoriteController = require('../controllers/favoriteController')
const authenticationUser = require('../middlewares/auth')
const router = express.Router()

router.use(authenticationUser)
router.get('/', FavoriteController.fetchFavorites)
router.post('/:id', FavoriteController.addFavorite)
router.delete('/:id', FavoriteController.destroyFavorite)

module.exports = router