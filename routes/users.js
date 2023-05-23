const express = require('express')
const UserController = require('../controllers/userController')
const authenticationUser = require('../middlewares/auth')
const router = express.Router()

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/google', UserController.googleSignIn)
router.get('/', UserController.fetchAlbums)
router.get('/:id', UserController.albumDetails)
router.use(authenticationUser)
router.post('/midtrans', UserController.midtransToken)


module.exports = router