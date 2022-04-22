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
                text: '接著請輸入：編號+空格+角色編號 例如："編號 2"',
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
