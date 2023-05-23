const { User } = require('../models/index')
const { verifyToken } = require("../helpers/jwt")

async function authenticationUser(req, res, next) {
    try {
        let { access_token } = req.headers
        let verify = verifyToken(access_token)
        let user = await User.findOne({
            where: {id: verify.id}
        })
        if (!user) {
            throw { name: 'unauthorized' }
        }
        req.user = {
            id: user.id, role: user.role, email: user.email
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = authenticationUser