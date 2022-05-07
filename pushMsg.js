const { getOgPost, getLineId } = require('./module/dbFn/forDBquery')
const logger = require('./src/logger')
const pushMsg = require('./src/msgForRes/rlyForFlex').pushMsg
const line = require('@line/bot-sdk')

const client = new line.Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
})

//step:
//declare og data and fetch

//fetch another data hours later(most recent))

//if not equal send push msg

//else do nothing ->timeout

function delay(number) {
    return new Promise(resolve => setTimeout(resolve, number))
}

const finalFn = async () => {
    const origin = await getOgPost() //get post
    await delay(10000) // 5400000 = wait 1 and half hour
    const recent = await getOgPost() //get recent post
    // logger.info(origin.post_text)
    // logger.info(recent.post_text)
    // logger.info(origin.post_text === recent.post_text)
    if (origin.post_id != recent.post_id) {
        const message = pushMsg(recent)
        const id = await getLineId()
        for (let i = 0; i < id.length; i++) {
            // console.log(id[i].line_id, message.body.contents[1].text)
            client.pushMessage(id[i].line_id, message)
        }
    }
    logger.info('no new post... restart fetching DB')
    setTimeout(finalFn, 1000)
}

finalFn()
