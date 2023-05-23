const jwt = require('jsonwebtoken')
const secret = "yana"

const createToken = (playload) => jwt.sign(playload, secret)
const verifyToken = (token) => jwt.verify(token, secret)

module.exports = { createToken, verifyToken }