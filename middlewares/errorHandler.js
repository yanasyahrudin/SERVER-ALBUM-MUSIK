async function errorHandler(error, req, res, next) {
    try {
        let status = 500
        let message = "Error on the internal server"
        switch (error.name) {
            case 'Invalid Credentials':
                status = 401
                message = 'Check Your Email and Password'
                break;
            case 'Forbidden':
                status = 403
                message = 'Access is Not Allowed or Not Your Role'
                break;
            case 'SequelizeValidationError':
                message = error.errors.map(el => {
                    return { message: el.message }
                })
                status = 400
                break;
            case 'Error Not Found':
                status = 404
                message = 'Not Found the Albums'
                break;
            case 'Unauthorized':
                status = 401
                message = 'Email or Password Error'
                break;
            case 'JsonWebTokenError':
                status = 401
                message = 'Your Are Not Logged in'
                break;
            case 'Validation len on name failed':
                status = 400
                message = 'Name must be at least 10 short and 50 characters long'
                break;
        }
        res.status(status).json(message)
    } catch (error) {
        next(error)
    }
}
module.exports = errorHandler