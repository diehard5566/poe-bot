const currencyData = require('../currency.json')

const replyFlexMsg = reqBody => {
    return JSON.stringify({
        replyToken: reqBody.events[0].replyToken,
        messages: [currencyData],
    })
}

module.exports = replyFlexMsg
