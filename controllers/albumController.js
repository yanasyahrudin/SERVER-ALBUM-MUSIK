const { Album, User } = require('../models/index')

class AlbumController {

    static async fetchAlbums(req, res, next) {
        try {
            let data = await Album.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async addAlbum(req, res, next) {
        try {
            let data = await Album.create({
                title: req.body.title,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                rating: req.body.rating,
                genreId: req.body.genreId,
                authorId: req.body.authorId
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }

    static async detailsAlbum(req, res, next) {
        try {
            let detailData = await Album.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (detailData) {
                res.status(200).json(detailData)
            } else {
                throw new Error('Error Not Found')
            }
        }
        catch (error) {
            next(error)
        }
    }

    static async destroyAlbum(req, res, next) {
        try {
            let data = await Album.findOne({ where: { id: req.params.id } })
            if (data) {
                await Album.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Album Success to Delete.' })
            } else { throw new Error('Error Not Found') }
        }
        catch (error) {
            next(error)
        }
    }

    static async editAlbum(req, res, next) {
        try {
            let album_id = req.params.id
            let editData = await Album.update({
                title: req.body.title,
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                rating: req.body.rating,
                genreId: req.body.genreId
            }, {
                where: {
                    id: album_id
                }
            })
            res.status(201).json({ message: 'Edit Succes Full' })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = AlbumController