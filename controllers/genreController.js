const { Genre } = require('../models/index')

class GenreController {

    static async fetchGenre(req, res, next) {
        try {
            let data = await Genre.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addGenre(req, res, next) {
        try {
            let data = await Genre.create({
                name: req.body.name
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async destroyGenre(req, res, next) {
        try {
            console.log(req.params.id, 'dari destroy genre');
            let genreData = await Genre.findOne({
                where: { id: req.params.id }
            })
            if (genreData) {
                await Genre.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Genre Success to Delete.' })
            } else { throw new Error('Error Not Found') }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = GenreController