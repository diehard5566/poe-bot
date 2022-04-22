const fetch = require('node-fetch')

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

        let leagueData = data.filter(el => el.league === 'Archnemesis')

        charNameInlist = leagueData.map((el, i) => ` ${i + 1}.${el.name}`).join('\n')

        console.log(charNameInlist)

        dataString = JSON.stringify({
            replyToken: reqBody.events[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: '你好啊,流亡者',
                },
                {
                    type: 'text',
                    text: `帳號:${accountName},這季總共有${leagueData.length}隻角色！`,
                },
                {
                    type: 'text',
                    text: '角色名：' + '\n' + charNameInlist,
                },
                {
                    type: 'text',
                    text: '接著請輸入：角色裝備+空格+角色編號',
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
                    text: `痾....帳號:${accountName}不存在！！！`,
                },
            ],
        })
    }

    return [dataString, charNameInlist]
}

module.exports = getCharacter
