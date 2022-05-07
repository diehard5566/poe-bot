const currencyData = require('../currency.json')
const getExchange = require('../../module/Exchange')
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

const pushMsg = recent => {
    const postFromPoedb = {
        type: 'flex',
        altText: '來自編年史的最新消息',
        contents: {
            type: 'carousel',
            contents: [
                {
                    type: 'bubble',
                    hero: {
                        type: 'image',
                        url: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t31.18172-8/11116573_1431516947156679_2592834439141048769_o.jpg?_nc_cat=108&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=q9yd5vTENkQAX9f0olG&_nc_ht=scontent.ftpe7-3.fna&oh=00_AT-Cfm9i3A-q8UdOH1coxjZJIbg4WpOf1ouxJ0z9n7mXMA&oe=629C82C6',
                        size: 'full',
                        aspectRatio: '20:13',
                        aspectMode: 'cover',
                        action: {
                            type: 'uri',
                            uri: 'https://www.facebook.com/poedbtw',
                        },
                    },
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'text',
                                text: '最新消息：',
                            },
                            {
                                type: 'text',
                                text: 'default',
                                weight: 'bold',
                                size: 'xl',
                                align: 'center',
                            },
                        ],
                    },
                },
            ],
        },
    }

    const post_text = recent.post_text
    const post_img = recent.post_img

    if (post_img != null) {
        postFromPoedb.contents.contents[0].hero.url = post_img
    }

    postFromPoedb.contents.contents[0].body.contents[1].text = post_text

    // const msg = {
    //     messages: [postFromPoedb],
    // }

    return postFromPoedb
}

module.exports = {
    replyFlexMsg,
    pushMsg,
}
// replyFlexMsg(reqBody)
