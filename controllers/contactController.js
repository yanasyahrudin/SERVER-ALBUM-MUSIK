const sendEmail = require('../helpers/nodeMailerContact');
const { Contact } = require('../models/index')

class ContactController {

    static async contactUs(req, res, next) {
        try {
            let { name, email, message } = req.body
            let data = await Contact.create({ name, email, message })
            sendEmail(name, email, message)
            res.status(201).json({ data })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ContactController