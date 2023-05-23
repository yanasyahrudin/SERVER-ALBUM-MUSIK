const { compare } = require('bcryptjs');
const { Op } = require('sequelize');
const { createToken } = require('../helpers/jwt');
const { User, Album, Favorite, Genre } = require('../models/index');
const sendEmail = require('../helpers/nodeMailer');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios')
const midtransClient = require('midtrans-client');
const rajaongkir = process.env.RAJAONGKIR_API_KEY

class UserController {

    static async registerUser(req, res, next) {
        try {
            let { email, password, username } = req.body
            let user = await User.create({
                email, password, username, role: 'User'
            })
            sendEmail(email, username)
            res.status(201).json({ user })
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({
                where: { email }
            })
            if (!user) {
                throw {
                    name: 'Invalid Credentials'
                }
            } else {
                let compareResult = compare(password, user.password)
                if (!compareResult) {
                    throw { name: 'Invalid Credentials' }
                } else {
                    let { id, email, role } = user
                    let access_token = createToken({
                        id, email, role
                    })
                    res.status(200).json({ access_token, username: user.username })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async fetchAlbums(req, res, next) {
        try {
            let limit = 9
            let offset = 0
            let option = {}
            if (req.query.title) {
                option.where = {
                    title: {
                        [Op.iLike]: `%${req.query.title}`
                    }
                }
            }
            if (req.query.genre) {
                option.where = {
                    genreId: req.query.genre
                }
            }
            if (req.query.offset) {
                offset = req.query.offset * limit
            }
            let dataAlbum = await Album.findAll({
                option,
                include: [User, Genre],
                limit,
                offset,
                where: option.where,
                order: [['id', 'asc']]
            })
            res.status(200).json(dataAlbum)
        } catch (error) {
            next(error)
        }
    }

    static async albumDetails(req, res, next) {
        try {
            let data = await Album.findOne({
                include: [User, Genre],
                where: { id: req.params.id }
            })
            if (!data) {
                throw new errorHandler(404, 'Error Not Found')
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleSignIn(req, res, next) {
        try {
            const { google_token } = req.headers
            const client = new OAuth2Client(process.env.CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const { email, name } = payload
            const [user, create] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    username: name,
                    email,
                    password: "justbefree",
                    role: 'User'
                },
                hooks: false
            })
            const access_token = createToken({
                id: user.id
            })
            res.status(200).json({ access_token, username: user.username })
        } catch (error) {
            next(error)
        }
    }

    static async midtransToken(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-ZQU4wWb0ZkWhko2QA8_bZZGZ'
            });

            let parameter = {
                transaction_details: {
                    order_id: "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000), //harus unique
                    gross_amount: 70000
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    username: user.username,
                    email: user.email
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken);
        } catch (error) {
            next(error)
        }
    }



}

module.exports = UserController