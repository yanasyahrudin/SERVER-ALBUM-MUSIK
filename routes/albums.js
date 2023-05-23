const express = require('express')
const AlbumController = require('../controllers/albumController')
const router = express.Router()

router.get('/', AlbumController.fetchAlbums)
router.post('/', AlbumController.addAlbum)
router.get('/:id', AlbumController.detailsAlbum)
router.delete('/:id', AlbumController.destroyAlbum)
router.put('/:id', AlbumController.editAlbum)

module.exports = router