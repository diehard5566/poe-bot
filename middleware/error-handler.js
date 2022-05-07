const logger = require('../src/logger')

const errorHandlerMiddleware = async (err, req, res, next) => {
    logger.error(err)
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware
