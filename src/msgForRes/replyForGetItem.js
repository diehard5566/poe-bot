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
                text:
                    '請等候查詢結果(約10-20秒)!第一次查詢完"該角色"後便可任意輸入裝備編號' +
                    '\n' +
                    '如果網址結尾為undefined則代表出錯了！請過陣子再試試！',
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

const replyForSingle = (reqBody, single) => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: single,
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
                text: `${allResultURL}`,
            },
            {
                type: 'text',
                text: '此功能僅供簡易查詢,無法達到精準搜尋,如果搜不到裝備,請自行調整詞綴！',
            },
            {
                type: 'text',
                text: '如果網址結尾為undefined則代表出錯了！請過陣子再試試！',
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

const fetchCompleted = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '裝備以查詢完畢,若要一次取得全部賣場連結,請輸入："裝備"',
            },
            {
                type: 'text',
                text: '若只想取得單一裝備賣場連結,請輸入："裝備 編號"(例如：裝備 1)',
            },
        ],
    })
}

module.exports = {
    replyForCharItems,
    charNotHaveItem,
    replyForResult,
    replyForGetItemErr,
    replyForSingle,
    fetchCompleted,
}
