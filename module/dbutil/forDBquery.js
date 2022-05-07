const db = require('../../db/connect')
const logger = require('../../src/logger')

const checkAndInsert = async (commandParam, lineUserId) => {
    await db
        .execute(
            `INSERT INTO main (account, line_id) VALUES('${commandParam[1]}', '${lineUserId}')
            ON DUPLICATE KEY UPDATE account='${commandParam[1]}', line_id='${lineUserId}'`
        )
        .then(data => {
            logger.info('Process done!')
        })
        .catch(err => {
            logger.error(err)
        })
}

// `INSERT INTO main (account, line_id)
// SELECT * FROM (SELECT '${commandParam[1]}', '${lineUserId}') AS tmp
// WHERE NOT EXISTS (
//     SELECT account,line_id FROM main WHERE account = '${commandParam[1]}' and line_id = '${lineUserId}'
// ) LIMIT 1;`

const getAccountFromDB = async lineUserId => {
    return await db
        .execute(
            `SELECT account FROM main 
                    WHERE line_id = '${lineUserId}'`
        )
        .then(data => {
            logger.info(data[0][0].account)
            return data[0][0].account
        })
        .catch(err => {
            console.log(err)
        })
}

const getCharNameFromDB = async (commandParam, lineUserId, account) => {
    return await db
        .execute(
            `SELECT character_name FROM character_info
                WHERE character_num = '${commandParam[1]}' 
                AND line_id = '${lineUserId}'
                AND account = '${account}'`
        )
        .then(data => {
            logger.info(data[0][0])
            return data[0][0].character_name
        })
        .catch(err => {
            logger.info(err)
        })
}

const addUrlToDB = async (lineUserId, i, trade_URL, charName) => {
    await db
        .execute(
            `INSERT INTO item_info (trade_url, item_num, line_id, character_name) VALUES('${trade_URL}',${i} ,'${lineUserId}','${charName}')
            ON DUPLICATE KEY UPDATE trade_url='${trade_URL}', line_id='${lineUserId}' ,character_name = '${charName}'` //
        )
        .then(data => {
            logger.info(data[0])
        })
        .catch(err => {
            logger.error(err)
        })
}

const getUrlFromDB = async (i, lineUserId, character_name) => {
    return await db
        .execute(
            `SELECT trade_url FROM item_info
            WHERE item_num = '${i}' 
            AND line_id = '${lineUserId}'
            AND character_name = '${character_name}' `
        )
        .then(data => {
            return data[0][0].trade_url
        })
        .catch(err => {
            logger.info(err)
        })
}

// const getOgPost = async () => {
//     return await db
//         .execute(
//             `SELECT * FROM data_fromPoedb
//     WHERE post_time = (
//     SELECT MAX(post_time) FROM data_fromPoedb)`
//         )
//         .then(data => {
//             // console.log('測試：', data[0][0])
//             return data[0][0]
//         })
//         .catch(err => logger.error(err))
// }

const getOriginPost = async () => {
    const res = await db.execute(
        `SELECT * FROM post_from_fb_poedb WHERE post_time = (SELECT MAX(post_time) FROM post_from_fb_poedb)`
    )
    return res[0][0]
}

const getLineId = async () => {
    const res = await db.execute(`SELECT line_id FROM main`)
    // console.log(res[0])
    return res[0]
}

module.exports = {
    checkAndInsert,
    getAccountFromDB,
    getCharNameFromDB,
    addUrlToDB,
    getUrlFromDB,
    getOriginPost,
    getLineId,
}
