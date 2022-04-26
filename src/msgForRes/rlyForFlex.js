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
    console.log('currentPrice:', currentPrice.Ex)

    currencyData.contents.contents[0].body.contents[1].text = `現在1崇高約為${currentPrice.Ex}c`
    currencyData.contents.contents[1].body.contents[1].text = `現在改造約為${currentPrice.Alt}崇高`

    const sendData = JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [currencyData],
    })

    console.log(currencyData.contents.contents[0].body.contents[1].text)
    console.log(currencyData.contents.contents[1].body.contents[1].text)

    return sendData
}

module.exports = replyFlexMsg

// replyFlexMsg(reqBody)
