const fetch = require('node-fetch')
const { replyForCharItems, replyForGetItemErr, charNotHaveItem } = require('../src/msgForRes/replyForGetItem')
const logger = require('../src/logger')
const storeItem = new Map()

const getItem = async (reqBody, res, accountName, charName) => {
    const url = `https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${charName}`

    let data
    let dataString
    let jewelData
    //身上各個裝備
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
        // console.log(data)

        storeItem.set('itemFromCharData', data)
        // console.log(storeItem.get('itemFromCharData'))

        const notEmptyName = storeItem.get('itemFromCharData').items.filter(e => {
            if (e.name != '') {
                return e.name
            }
        })

        const items = notEmptyName.map((el, i) => ` ${i + 1}.${el.name}-(${el.inventoryId})`).join('\n')
        // console.log(items)

        //天賦樹上的珠寶
        const jewelUrl = `https://www.pathofexile.com/character-window/get-passive-skills?accountName=${accountName}&character=${charName}&reqData=1`

        res = await fetch(jewelUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)', // 👈
            },
        })
        jewelData = await res.json()

        storeItem.set('itemFromJewelData', jewelData)

        const jewelInList = storeItem
            .get('itemFromJewelData')
            .items.map((el, i) => ` ${i + 1}. ${el.name}`)
            .join('\n')

        if (items.length === 0) {
            dataString = charNotHaveItem(reqBody, items, jewelInList)
        } else {
            dataString = replyForCharItems(reqBody, items, jewelInList)
        }

        if (data.error) {
            throw new Error('error')
        }
    } catch (error) {
        // Message data, must be stringified
        dataString = replyForGetItemErr(reqBody)

        logger.error(error)
    }

    return dataString
}

module.exports = [getItem, storeItem]
