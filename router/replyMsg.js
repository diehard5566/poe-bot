const getChar = require('../controller/getChar')
const getItem = require('../controller/getItem')
const reSponse = require('../controller/resSetting')

const token = process.env.LINE_ACCESS_TOKEN

/**
 *TODO:
 是只有專門在拆 accountname/charname 這樣就可以做類似 route 的事情了
 -只是是用 if 判斷
 *要去執行哪個 controller
 *if split[0] == "userinfo":
 *    userInfoController()
*if split[1] == "charinfo":
 *charInfoController()
 **/
const storeInfo = new Map()

const replyMsg = async (reqBody, res) => {
    const reqBodyMsg = reqBody.events[0].type

    const commandParam = reqBody.events[0].message.text.split(' ')
    console.log('user input: ', commandParam)

    if (reqBodyMsg === 'message') {
        //1.userAccount 2.charItem

        // let account = 'userAccount-' + commandParam[1]

        // console.log('userAccount:', account)

        // storeInfo.set(account, account.split('-')[1])

        // console.log(storeInfo)

        let accountName

        // console.log('userAccount:', accountName)storeInfo.get(account)

        //輸入帳號，取得角色列表
        if (commandParam[0] === 'userAccount') {
            // accountName = commandParam[1]

            let accountKey = 'userAccount-' + commandParam[1]

            storeInfo.set(accountKey, accountKey.split('-')[1])

            console.log(storeInfo)

            accountName = storeInfo.get(accountKey)

            const dataString = await getChar(reqBody, res, accountName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)
        }

        //輸入角色名,取得身上裝備
        if (commandParam[0] === 'charItem') {
            // accountName = data.key[1]
            // console.log(commandParam[0])
            // const charName = commandParam[1]

            // let account = 'userAccount-' + commandParam[1]
            // storeInfo.set(account, account.split('-')[1])
            // let accountName = storeInfo.get(account)

            for (const [key, value] of storeInfo.entries()) {
                accountName = value //return key
            }

            //storeInfo.get(`userAccount-diehard5566`)

            console.log('帳號：', accountName)

            let charKey = 'charItem-' + commandParam[1]
            storeInfo.set(charKey, charKey.split('-')[1])
            let charName = storeInfo.get(charKey)

            console.log('角色: ', charName)
            console.log(storeInfo)

            const dataString = await getItem(reqBody, res, accountName, charName)
            console.log('dataString: ', dataString)

            reSponse(dataString, token)
        }
    }
}

storeInfo.clear()

module.exports = replyMsg
