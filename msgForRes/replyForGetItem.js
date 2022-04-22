const replyForCharItems = (reqBody, items, jewelInList) => {
    return JSON.stringify({
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

module.exports = { replyForCharItems, charNotHaveItem, replyForGetItemErr }
