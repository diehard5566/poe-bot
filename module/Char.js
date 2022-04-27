const fetch = require('node-fetch')
const { replyForCharInfo, replyForCharNotFound } = require('../src/msgForRes/replyForGetChar')
const logger = require('../src/logger')

const storeCharInfo = new Map()

const getCharacter = async (reqBody, res, accountName) => {
    const url = `https://www.pathofexile.com/character-window/get-characters?accountName=${accountName}`

    let data
    let dataString
    let charNameInlist
    try {
        res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)', // 👈
            },
        })
        data = await res.json()

        storeCharInfo.set('dataFromGGG', data)

        let leagueData = storeCharInfo.get('dataFromGGG').filter(el => el.league === 'Archnemesis')

        charNameInlist = leagueData.map(el => el.name)

        const nameInOrderList = leagueData.map((el, i) => ` ${i + 1}.${el.name}`).join('\n')

        dataString = replyForCharInfo(reqBody, accountName, leagueData, nameInOrderList)

        if (data.error) {
            throw new Error('error')
        }
    } catch (error) {
        // Message data, must be stringified
        // replyForCharInfo(reqBody, accountName, leagueData, nameInOrderList)
        dataString = replyForCharNotFound(reqBody, accountName)
        logger.error(error)
    }

    return [dataString, charNameInlist, storeCharInfo]
}

module.exports = getCharacter
