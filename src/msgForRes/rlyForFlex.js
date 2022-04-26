const currencyData = require('../currency.json')

const replyFlexMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [
            {
                type: 'carousel',
                contents: [
                    {
                        type: 'bubble',
                        hero: {
                            type: 'image',
                            size: 'full',
                            aspectRatio: '20:13',
                            aspectMode: 'cover',
                            url: 'https://i.imgur.com/YeTZPiE.jpeg',
                            action: {
                                type: 'uri',
                                label: 'action',
                                uri: 'https://poe.ninja/challenge/currency/exalted-orb',
                            },
                        },
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'Exalted Orb',
                                    wrap: true,
                                    weight: 'bold',
                                    size: 'xl',
                                    color: '#ffffff',
                                },
                                {
                                    type: 'text',
                                    text: 'Buy:',
                                    weight: 'bold',
                                    style: 'normal',
                                    margin: 'lg',
                                    size: 'lg',
                                    color: '#ffffff',
                                },
                                {
                                    type: 'text',
                                    text: 'Sell:',
                                    weight: 'bold',
                                    size: 'lg',
                                    margin: 'lg',
                                    color: '#ffffff',
                                },
                            ],
                            backgroundColor: '#464F69',
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'button',
                                    style: 'primary',
                                    action: {
                                        type: 'uri',
                                        label: 'Buy(Poe.trade)',
                                        uri: 'https://www.pathofexile.com/trade/exchange/Archnemesis/Nn8Vt0',
                                    },
                                },
                                {
                                    type: 'button',
                                    action: {
                                        type: 'uri',
                                        label: 'Sell(Poe.trade)',
                                        uri: 'https://www.pathofexile.com/trade/exchange/Archnemesis/12R5ck',
                                    },
                                    style: 'primary',
                                },
                            ],
                        },
                    },
                    {
                        type: 'bubble',
                        hero: {
                            type: 'image',
                            size: 'full',
                            aspectRatio: '20:13',
                            aspectMode: 'cover',
                            url: 'https://i.imgur.com/YeTZPiE.jpeg',
                            action: {
                                type: 'uri',
                                label: 'action',
                                uri: 'https://poe.ninja/challenge/currency/exalted-orb',
                            },
                        },
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'Exalted Orb',
                                    wrap: true,
                                    weight: 'bold',
                                    size: 'xl',
                                    color: '#ffffff',
                                },
                                {
                                    type: 'text',
                                    text: 'Buy:',
                                    weight: 'bold',
                                    style: 'normal',
                                    margin: 'lg',
                                    size: 'lg',
                                    color: '#ffffff',
                                },
                                {
                                    type: 'text',
                                    text: 'Sell:',
                                    weight: 'bold',
                                    size: 'lg',
                                    margin: 'lg',
                                    color: '#ffffff',
                                },
                            ],
                            backgroundColor: '#464F69',
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            spacing: 'sm',
                            contents: [
                                {
                                    type: 'button',
                                    style: 'primary',
                                    action: {
                                        type: 'uri',
                                        label: 'Buy(Poe.trade)',
                                        uri: 'https://www.pathofexile.com/trade/exchange/Archnemesis/Nn8Vt0',
                                    },
                                },
                                {
                                    type: 'button',
                                    action: {
                                        type: 'uri',
                                        label: 'Sell(Poe.trade)',
                                        uri: 'https://www.pathofexile.com/trade/exchange/Archnemesis/12R5ck',
                                    },
                                    style: 'primary',
                                },
                            ],
                        },
                    },
                ],
            },
        ],
    })
}

module.exports = replyFlexMsg