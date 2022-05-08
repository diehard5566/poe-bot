const replyDefaultMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '你好啊,流亡者',
            },
            {
                type: 'text',
                text: '請輸入："指令"',
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
                text:
                    '指令：' +
                    '\n' +
                    '1.帳號(查詢帳號角色/裝備)' +
                    '\n' +
                    '請輸入：帳號+空格+帳號名稱,例如："帳號 abc123" ' +
                    '\n',
            },
            {
                type: 'text',
                text: '2.通貨(查詢通貨價格 from ninja) ' + '\n' + '直接輸入："通貨"',
            },
        ],
    })
}

const replyForRecourse = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `本功能尚未開發,coming soon...`,
            },
        ],
    })
}

const replyForAccountPrompt = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `請輸入：帳號+空格+帳號名稱,例如："帳號 abc123" `,
            },
        ],
    })
}

const replyForTodayLab = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `本功能尚未開發,coming soon...`,
            },
        ],
    })
}

const replyForAbout = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: '本程式資料來源自：' + '\n' + '# Grinding Gear Games' + '\n' + '# poe.ninja' + '\n' + '# poedbtw',
            },
            {
                type: 'text',
                text:
                    '有任何疑問或建議歡迎來信：shihyao001@gmail.com' +
                    '\n' +
                    '或至GitHub留下您的意見或自行取用：https://github.com/diehard5566/poe-bot',
            },
        ],
    })
}

module.exports = {
    replyDefaultMsg,
    replyForCommand,
    replyForRecourse,
    replyForAccountPrompt,
    replyForTodayLab,
    replyForAbout,
}
