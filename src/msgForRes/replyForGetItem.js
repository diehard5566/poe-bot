const replyForCharItems = (reqBody, items, jewelInList) => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '這是查詢的角色的全身裝備列表(不含藥水、技能)：' + '\n' + items,
                // '\n' +
                // '珠寶： ' +
                // '\n' +
                // jewelInList,
            },
            {
                type: 'text',
                text: '請輸入:"裝備"(不需要加其他東西,否則無法接收指令),並等候查詢結果！(約10-20秒)',
            },
        ],
    })
}

const charNotHaveItem = (reqBody, items, jewelInList) => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '這位流亡者窮到沒穿裝備R,換個編號查吧',
            },
        ],
    })
}

const replyForResult = (reqBody, allResultURL) => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `感謝您的耐心等候！`,
            },
            {
                type: 'text',
                text: `${allResultURL}`,
            },
            {
                type: 'text',
                text: '此功能僅供簡易查詢,無法達到精準搜尋,如果搜不到裝備,請自行調整詞綴！',
            },
            {
                type: 'text',
                text: '如果網址結尾為undefined則代表查詢過多次,請過陣子再試試！',
            },
        ],
    })
}

const replyDefaultMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '請輸入：帳號+空格+要查詢的帳號！ 例如："帳號 xxxxx"',
            },
        ],
    })
}

const replyForGetItemErr = reqBody => {
    return JSON.stringify({
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
}

module.exports = { replyForCharItems, charNotHaveItem, replyForResult, replyDefaultMsg, replyForGetItemErr }
