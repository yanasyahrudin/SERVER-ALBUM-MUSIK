const { Favorite, Album, Genre } = require('../models/index')


class FavoriteController {

    static async fetchFavorites(req, res, next) {
        try {
            let user_id = req.user.id
            let favoriteData = await Favorite.findAll({
                include: [
                    { model: Album, include: Genre }
                ],
                where: {
                    UserId: user_id
                }
            })
            if (!favoriteData) {
                throw new Error(404, 'Error Not Found')
            }
            res.status(200).json(favoriteData)
        } catch (error) {
            next(error)
        }
    }

    static async addFavorite(req, res, next) {
        try {

            let { id } = req.params
            let findData = await Album.findByPk(id)
            if (!findData) {
                throw {
                    message: 'Not Found Album'
                }
            }
            let user_id = req.user.id
            let favorite = await Favorite.create({
                UserId: user_id,
                AlbumId: id
            })
            res.status(201).json(favorite)
        } catch (error) {
            next(error)
        }
    }

    static async destroyFavorite(req, res, next) {
        try {
            console.log(req.params.id, 'dari destroy favorites');
            let data = await Favorite.findOne({
                where: { id: req.params.id }
            })
            if (data) {
                await Favorite.destroy({
                    where: { id: req.params.id }
                })
                res.status(200).json({ message: 'Successfully Removed from Favorites' })
            } else {
                throw new Error('Error Not Found')
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = FavoriteController