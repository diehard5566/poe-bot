const fs = require('fs')

const currencyData = require('../currency.json')

const replyFlexMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [{ type: 'flex', altText: 'Flex msg test', contents: currencyData, currencyData, currencyData }],
    })
}

module.exports = replyFlexMsg
