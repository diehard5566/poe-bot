const { getOriginPost, getLineId } = require('./module/dbutil/forDBquery')
const logger = require('./src/logger')
const pushMsg = require('./src/msgForRes/replyForFlex').pushMsg
const line = require('@line/bot-sdk')

const client = new line.Client({
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
})

//step:
//declare og data and fetch

//fetch another data hours later(most recent))

//if not equal send push msg

//else do nothing ->timeout

// let postExample = {
//     image: 'https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/280445350_2799545840353776_7035121469207734958_n.png?_nc_cat=110&ccb=1-6&_nc_sid=8024bb&_nc_ohc=XHec8OPe1qIAX_7Y4--&_nc_ht=scontent-tpe1-1.xx&oh=00_AT9aeosSJ3qoWBgUWRKca2CGYfWg6FfIIPv56lG-VgycgA&oe=627DE003',
//     post_id: '2257188721032235',
//     post_text: `Patch 3.18 地圖階級資訊`,
//     post_url: 'https://facebook.com/story.php?story_fbid=2257188721032235&id=119240841493711',
// }

function delay(number) {
    return new Promise(resolve => setTimeout(resolve, number))
}

const finalFn = async () => {
    const origin = await getOriginPost() // getpost
    await delay(10000) // 5400000 = wait 1 and half hour
    const recent = await getOriginPost() //postExample
    // logger.info(origin.post_text)
    // logger.info(recent.post_text)
    // logger.info(origin.post_text === recent.post_text)
    if (origin.post_id != recent.post_id) {
        const message = pushMsg(recent)
        const id = await getLineId()
        for (let i = 0; i < id.length; i++) {
            // console.log(id[i].line_id, message)
            const sendToUser = client.pushMessage(id[i].line_id, message)
            logger.info(sendToUser)
        }
    }
    logger.info('no new post... restart fetching DB')
    setTimeout(finalFn, 1000)
}

finalFn()
