const db = require('../../db/connect')
const logger = require('../../src/logger')

const checkAndInsert = async (commandParam, lineUserId) => {
    await db
        .execute(
            `INSERT INTO main (account, line_id)
        SELECT * FROM (SELECT '${commandParam[1]}', '${lineUserId}') AS tmp
        WHERE NOT EXISTS (
            SELECT account,line_id FROM main WHERE account = '${commandParam[1]}' and line_id = '${lineUserId}'
        ) LIMIT 1;`
        )
        .then(data => {
            logger.info('Process done!')
        })
        .catch(err => {
            logger.error(err)
        })
}

const getAccountFromDB = async (commandParam, lineUserId) => {
    return await db
        .execute(
            `SELECT account FROM main 
                    WHERE account='${commandParam[1]}' AND line_id = '${lineUserId}'`
        )
        .then(data => {
            logger.info(data[0][0].account)
            return data[0][0].account
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    checkAndInsert,
    getAccountFromDB,
}
