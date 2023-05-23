const express = require('express')
const router = express.Router()
const routeAlbums = require('./albums')
const routeGenres = require('./genres')
const routeUsers = require('./users')
const routeFavorites = require('./favorites')
const routeContacts = require('./contacts')
const routeCarts = require('./carts')

router.use('/albums', routeAlbums)
router.use('/genres', routeGenres)
router.use('/users', routeUsers)
router.use('/favorites', routeFavorites)
router.use('/contacts', routeContacts)
router.use('/carts', routeCarts)

module.exports = router

