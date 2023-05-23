const { Album, Genre, Cart } = require('../models/index')

class CartController {

    static async fetchCarts(req, res, next) {
        try {
            let user_id = req.user.id
            let cartData = await Cart.findAll({
                include: [
                    { model: Album, include: Genre }
                ],
                where: {
                    UserId: user_id
                }
            })
            if (!cartData) {
                throw new Error(404, "Error Not Found")
            }
            res.status(200).json(cartData)
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        try {
            let { id } = req.params
            let findData= await Album.findByPk(id)
            if (!findData) {
                throw {
                    message: 'Not Found Album'
                }
            }
            let user_id = req.user.id
            let createCart= await Cart.create({
                UserId: user_id,
                AlbumId: id
            })
            res.status(201).json(createCart)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CartController