const res = require('express/lib/response')
const resource = require('../resouce.json')

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
                    '請輸入：迷宮' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '5.關於BOT ↓' +
                    '\n' +
                    '請輸入：關於',
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
                    // '\n' +
                    // '4.查詢花園策略 ↓' +
                    // '\n' +
                    // '請輸入：花園' +
                    // '\n' +
                    // '----------------' +
                    '\n' +
                    '4.查詢迷宮攻略 ↓' +
                    '\n' +
                    '請輸入：迷宮攻略' +
                    '\n' +
                    '----------------' +
                    '\n' +
                    '5.查詢賺錢策略 ↓' +
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
                text:
                    '本程式資料來源自：' +
                    '\n' +
                    '# Grinding Gear Games' +
                    '\n' +
                    '# poe.ninja' +
                    '\n' +
                    '# poedbtw' +
                    '\n' +
                    '# 巴哈姆特',
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

//resource
const replyForArchemesis = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'image',
                originalContentUrl: resource.Resource.archemesis.img,
                previewImageUrl: resource.Resource.archemesis.img,
            },
            {
                type: 'text',
                text: `${resource.Resource.archemesis.post}`,
            },
        ],
    })
}
const replyForLeveling = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `Act1-10路線： ${resource.Resource.leveling.doc}`,
            },
            {
                type: 'text',
                text: `YT: ${resource.Resource.leveling.youtube}`,
            },
            {
                type: 'text',
                text: resource.Resource.leveling.web,
            },
            {
                type: 'text',
                text: resource.Resource.leveling.youtubeTY,
            },
        ],
    })
}
const replyForHeist = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `YT： ${resource.Resource.heist.youtube}`,
            },
            {
                type: 'text',
                text: `攻略(EN)： ${resource.Resource.heist.docEN}`,
            },
            {
                type: 'text',
                text: `攻略(TW)： ${resource.Resource.heist.docTWGoogleTranslate}`,
            },
        ],
    })
}
// const replyForHarvest = reqBody => {
//     return JSON.stringify({
//         replyToken: reqBody.events[0].replyToken,
//         messages: [
//             {
//                 type: 'text',
//                 text: `巴哈攻略：${resource.Resource.harvest.post}`,
//             },
//         ],
//     })
// }
const replyForLab = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `巴哈攻略：${resource.Resource.lab.post}`,
            },
            {
                type: 'text',
                text: `基底表單：${resource.Resource.lab.cheatSheet}`,
            },
            {
                type: 'text',
                text: `必備工具：${resource.Resource.lab.tool}`,
            },
        ],
    })
}
const replyForEarnCurrency = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'text',
                text: `休閒玩家：${resource.Resource.earnCurrency.casualExileGuideByPOM}`,
            },
            {
                type: 'text',
                text: `打鐵模擬器：${resource.Resource.earnCurrency.coe}`,
            },
            {
                type: 'text',
                text: `收益試算：${resource.Resource.earnCurrency.poeProfit}`,
            },
            {
                type: 'text',
                text: `物價指數：${resource.Resource.earnCurrency.currencyData}`,
            },
            {
                type: 'text',
                text: `搬磚工具：${resource.Resource.earnCurrency.chaosRecipe}`,
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
    replyForArchemesis,
    replyForLeveling,
    replyForHeist,
    // replyForHarvest,
    replyForLab,
    replyForEarnCurrency,
}
