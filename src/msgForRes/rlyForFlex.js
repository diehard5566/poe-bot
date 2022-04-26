const currencyData = require('../currency.json')
const getExchange = require('../../module/Exchange')
// const reqBody = {
//     destination: 'xxxxxxxxxx',
//     events: [
//         {
//             type: 'message',
//             message: {
//                 type: 'text',
//                 id: '14353798921116',
//                 text: 'Hello, world',
//             },
//             timestamp: 1625665242211,
//             source: {
//                 type: 'user',
//                 userId: 'U80696558e1aa831...',
//             },
//             replyToken: '757913772c4646b784d4b7ce46d12671',
//             mode: 'active',
//         },
//         {
//             type: 'follow',
//             timestamp: 1625665242214,
//             source: {
//                 type: 'user',
//                 userId: 'Ufc729a925b3abef...',
//             },
//             replyToken: 'bb173f4d9cf64aed9d408ab4e36339ad',
//             mode: 'active',
//         },
//         {
//             type: 'unfollow',
//             timestamp: 1625665242215,
//             source: {
//                 type: 'user',
//                 userId: 'Ubbd4f124aee5113...',
//             },
//             mode: 'active',
//         },
//     ],
// }

const replyFlexMsg = async reqBody => {
    const currentPrice = await getExchange()
    // console.log('currentPrice:', currentPrice.Ex)

    currencyData.contents.contents[0].body.contents[1].text = `現在鏡子約為${currentPrice.Mirror}個崇高`
    currencyData.contents.contents[1].body.contents[1].text = `現在1崇高約能買${currentPrice.Ex}個混沌`
    currencyData.contents.contents[2].body.contents[1].text = `現在1崇高約能買${currentPrice.Alt}個改造`
    currencyData.contents.contents[3].body.contents[1].text = `現在1崇高約能買${currentPrice.Sco}個重鑄`
    currencyData.contents.contents[4].body.contents[1].text = `現在1崇高約能買${currentPrice.Fus}個連結`
    currencyData.contents.contents[5].body.contents[1].text = `現在1混沌約能買${currentPrice.Reg}個後悔`
    currencyData.contents.contents[6].body.contents[1].text = `現在1崇高約能買${currentPrice.Vaal}個瓦寶`
    currencyData.contents.contents[7].body.contents[1].text = `現在1混沌約能買${currentPrice.Alc}個點金`

    const sendData = JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [currencyData],
    })

    return sendData
}

module.exports = replyFlexMsg

// replyFlexMsg(reqBody)
