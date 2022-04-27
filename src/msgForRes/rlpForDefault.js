const replyDefaultMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '您好啊！流亡者',
            },
            {
                type: 'text',
                text: '請輸入：指令',
            },
        ],
    })
}

const replyForCommand = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '指令：' + '\n' + '1.帳號(查詢帳號角色/裝備)' + '\n' + '2.通貨(查詢通貨價格 from ninja) ' + '\n',
            },
        ],
    })
}

module.exports = { replyDefaultMsg, replyForCommand }
