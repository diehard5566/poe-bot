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
                text:
                    '2.查詢通貨現價 ↓ ' +
                    '\n' +
                    '請輸入：通貨' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '3.實用連結 ↓' +
                    '\n' +
                    '請輸入：連結' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '4.本日迷宮 ↓' +
                    '\n' +
                    '請輸入：lab' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '5.關於BOT ↓' +
                    '\n' +
                    '請輸入：about',
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
                text:
                    '1.查詢宿敵配方 ↓ ' +
                    '\n' +
                    '請輸入：宿敵' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '2.查詢章節教學 ↓' +
                    '\n' +
                    '請輸入：章節' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '3.查詢搶劫策略 ↓' +
                    '\n' +
                    '請輸入：搶劫' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '4.查詢花園策略 ↓' +
                    '\n' +
                    '請輸入：花園' +
                    '----------------' +
                    '\n' +
                    '5.查詢迷宮攻略 ↓' +
                    '\n' +
                    '請輸入：迷宮' +
                    '----------------' +
                    '\n' +
                    '6.查詢賺錢策略 ↓' +
                    '\n' +
                    '請輸入：發大財',
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
