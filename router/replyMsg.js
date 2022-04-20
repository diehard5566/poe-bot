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
//用Map去存帳號
const storeInfo = new Map()

const replyMsg = async (reqBody, res) => {
    const reqBodyMsg = reqBody.events[0].type
    const commandParam = reqBody.events[0].message.text.split(' ')
    let accountName

    if (reqBodyMsg === 'message') {
        //輸入帳號，取得角色列表
        if (commandParam[0] === '帳號') {
            let accountKey = '帳號-' + commandParam[1]

            storeInfo.set(accountKey, accountKey.split('-')[1])

            accountName = storeInfo.get(accountKey)

            const dataString = await getChar(reqBody, res, accountName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)
        }

        //輸入角色名,取得身上裝備
        if (commandParam[0] === '角色裝備') {
            Array.from(storeInfo.values()).map(value => (accountName = value))

            let charKey = '角色裝備-' + commandParam[1]
            storeInfo.set(charKey, charKey.split('-')[1])
            let charName = storeInfo.get(charKey)

            console.log('帳號：', accountName)
            console.log('角色: ', charName)
            console.log(storeInfo)

            const dataString = await getItem(reqBody, res, accountName, charName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)

            //把map清空
            storeInfo.clear()
        }
    }
}

module.exports = replyMsg
