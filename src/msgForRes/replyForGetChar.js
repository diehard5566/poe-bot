const replyForCharInfo = (reqBody, accountName, leagueData, nameInOrderList) => {
    return JSON.stringify({
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
                text: '角色名：' + '\n' + nameInOrderList,
            },
            {
                type: 'text',
                text: '接著請輸入：編號+空格+角色編號數字 例如："編號 2"',
            },
            {
                type: 'text',
                text:
                    '輸入之後,查詢約需要20-30秒!稍後會直接回傳給您！' +
                    '\n' +
                    '如果網址結尾為undefined則代表出錯了！請過陣子再試試！',
            },
        ],
    })
}

const replyForCharNotFound = (reqBody, accountName) => {
    return JSON.stringify({
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

module.exports = { replyForCharInfo, replyForCharNotFound }
