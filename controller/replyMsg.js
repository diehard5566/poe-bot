const getChar = require('./getChar')
const getItem = require('./getItem')
const reSponse = require('./responseSetting')

const token = process.env.LINE_ACCESS_TOKEN

const replyMsg = async (reqBody, res) => {
    if (reqBody.events[0].type === 'message' && reqBody.events[0].message.text.includes('/')) {
        const accountName = reqBody.events[0].message.text.split('/')[0]
        const charName = reqBody.events[0].message.text.split('/')[1]

        const dataString = await getItem(reqBody, res, accountName, charName)
        console.log(dataString)

        reSponse(dataString, token)
    } else if (reqBody.events[0].type === 'message') {
        const accountName = reqBody.events[0].message.text

        const dataString = await getChar(reqBody, res, accountName)
        console.log(dataString)

        //send request
        reSponse(dataString, token)
    }
}

module.exports = replyMsg
