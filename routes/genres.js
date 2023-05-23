const express = require('express')
const GenreController = require('../controllers/genreController')
const router = express.Router()

router.get('/', GenreController.fetchGenre)
router.post('/', GenreController.addGenre)
router.delete('/:id', GenreController.destroyGenre)


module.exports = router