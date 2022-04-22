const fetch = require('node-fetch')

const storeItem = new Map()

const getItem = async (reqBody, res, accountName, charName) => {
    const url = `https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${charName}`

    let data
    let dataString
    let jewelData
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

        //TODO:把裝備後面加上它部位的名字(e.g. 頭盔/腰帶...)非必要

        const notEmptyName = storeItem.get('itemFromCharData').items.filter(e => {
            if (e.name != '') {
                return e.name
            }
        })

        const items = notEmptyName.map((el, i) => ` ${i + 1}. ${el.name}`).join('\n')

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

        dataString = JSON.stringify({
            replyToken: reqBody.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text:
                        '這是查詢的角色的全身裝備列表(不含藥水、技能)：' +
                        '\n' +
                        items +
                        '\n' +
                        '珠寶： ' +
                        '\n' +
                        jewelInList,
                },
            ],
        })

        if (data.error) {
            throw new Error('error')
        }
    } catch (error) {
        // Message data, must be stringified
        dataString = JSON.stringify({
            replyToken: reqBody.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text: '痾....好像有地方錯了,恢復上一動！',
                },
            ],
        })
        console.log(error)
    }

    return dataString
}

module.exports = getItem
