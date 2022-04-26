const currencyData = require('../currency.json')
const fetch = require('node-fetch')

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

const exchangeInfo = new Map()

const getExchange = async () => {
    const res = await fetch(
        'https://poe.ninja/api/data/CurrencyHistory?league=Archnemesis&type=Currency&currencyId=2',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    const exaltedOrb = await res.json()
    const currentEx = Math.round(
        exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
    )

    exchangeInfo.set('currentEx', currentEx)
    const todayExPrice = exchangeInfo.get('currentEx')

    return todayExPrice
}

const replyFlexMsg = async reqBody => {
    const currentEx = await getExchange()
    console.log('currentEx:', currentEx)

    currencyData.contents.contents[0].body.contents[1].text = `現在1崇高約為${currentEx}c`

    const sendData = JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [currencyData],
    })

    console.log(currencyData.contents.contents[0].body.contents[1].text)
    return sendData
}

module.exports = replyFlexMsg

// replyFlexMsg(reqBody)
