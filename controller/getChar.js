const fetch = require('node-fetch')

const getCharacter = async (req, res, accountName) => {
    const url = `https://www.pathofexile.com/character-window/get-characters?accountName=${accountName}`

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

        let charName = data.map(el => el.name)

        dataString = JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text: `帳號:${accountName},目前總共有${data.length}隻角色！`,
                },
                {
                    type: 'text',
                    text: `角色名：${charName}`,
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
                    text: `痾....帳號:${accountName}不存在！！！`,
                },
            ],
        })
    }

    return dataString
}

module.exports = getCharacter
