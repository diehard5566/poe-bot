const currencyData = require('../currency.json')
const getExchange = require('../../module/exchange')
const getExchangeTest = require('../../module/exchangeTest')
const getItemUsage = require('../../module/getUsageFromNinja')
const getItemPrice = require('../../module/getItemPrice')
const flexForSearch = require('../ninjaItemOverView/flexMsgForSearch.json')
const getURLFromGGG = require('../../module/urlFromGGG')
const { getItemForSearchName } = require('../../module/searchAPI/searchJson')

// const postFromPoedb = require('../newPostFromPoedb.json')
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
    const currentPrice = await getExchangeTest()
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

const pushMsg = recent => {
    let postFromPoedb = {
        type: 'text',
        text: 'default',
    }
    const post_text = recent.post_text
    const post_img = recent.image

    if (post_img != null) {
        postFromPoedb = [
            {
                type: 'text',
                text: 'default',
            },
            {
                type: 'image',
                originalContentUrl: post_img,
                previewImageUrl: post_img,
            },
        ]

        postFromPoedb[0].text = '最新消息(from poedbTW):' + post_text
    } else {
        postFromPoedb.text = '最新消息(from poedbTW):' + post_text
    }

    return postFromPoedb
}

const replySearchItem = async (reqBody, translated) => {
    const originMsg = reqBody.events[0].message.text
    const usage = await getItemUsage(translated)
    const itemPrice = (await getItemPrice(translated)).price //TODO 這邊可能還要把picture一起export過來
    const itemPictureUrl = (await getItemPrice(translated)).icon

    const searchJsonReady = getItemForSearchName(translated)
    const priceUrl = await getURLFromGGG(searchJsonReady)

    console.log('我是官網連結', priceUrl)

    flexForSearch.contents.contents[0].body.contents[0].text = originMsg //name
    flexForSearch.contents.contents[0].body.contents[1].contents[0].contents[1].text = itemPrice + '崇高' //價格
    flexForSearch.contents.contents[0].body.contents[1].contents[1].contents[1].text = usage + '%' //使用率
    flexForSearch.contents.contents[0].hero.url = itemPictureUrl
    const sendData = JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [flexForSearch],
    })

    return sendData
}

module.exports = {
    replyFlexMsg,
    pushMsg,
    replySearchItem,
}
// replyFlexMsg(reqBody)
