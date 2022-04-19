const fetch = require('node-fetch')

const getItem = async (req, res, accountName, charName) => {
    const url = `https://www.pathofexile.com/character-window/get-items?accountName=${accountName}&character=${charName}`

    let data
    let dataString
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
        const notEmptyName = data.items.filter(e => {
            if (e.name != '') {
                return e.name
            }
        })
        const items = notEmptyName.map((el, i) => ` ${i + 1}. ${el.name}`, '\n')
        console.log(items)

        dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text: `這是你的全身裝備列表(不含藥水、珠寶、技能):${items}`,
                },
            ],
        })

        if (data.error) {
            throw new Error('error')
        }
    } catch (error) {
        // Message data, must be stringified
        dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text: `痾....好像有地方錯了`,
                },
            ],
        })
        console.log(error)
    }

    return dataString
}

module.exports = getItem
