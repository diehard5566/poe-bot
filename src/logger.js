const pino = require('pino')

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:yyyy-dd-mm HH:MM:ss',
            ignore: 'pid,hostname',
            destination: 1,
            crlf: false,
        },
    },
})

module.exports = logger
