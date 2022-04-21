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

    const lineUserId = reqBody.events[0].source.userId
    console.log(lineUserId);
    
    
    const commandParam = reqBody.events[0].message.text.split(' ')
    let accountName
    
    if (reqBodyMsg === 'message') {
        //把lienID跟帳號綁定
        //輸入帳號，取得角色列表
        if (commandParam[0] === '帳號') {
            storeInfo.set(lineUserId, commandParam[1])
            
            // let accountValue = '帳號-' + commandParam[1]

            // storeInfo.set(accountValue, accountValue.split('-')[1])

            accountName = storeInfo.get(lineUserId)
            console.log(storeInfo);

            const dataString = await getChar(reqBody, res, accountName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)
        }

        //輸入角色名,取得身上裝備
        //TODO:選角色改成輸入號碼就好
        else if (commandParam[0] === '角色裝備') {
            // Array.from(storeInfo.values()).map(value => (accountName = value))
            accountName = storeInfo.get(lineUserId)

            let charKey = '角色裝備-' + commandParam[1]
            storeInfo.set(charKey, charKey.split('-')[1])
            let charName = storeInfo.get(charKey)

            const dataString = await getItem(reqBody, res, accountName, charName)
            console.log('dataString: ', dataString)

            console.log(storeInfo);
            //send request
            reSponse(dataString, token)

            //把map清空
            // storeInfo.clear()
        } else {
            const dataString = JSON.stringify({
                replyToken: reqBody.events[0].replyToken,
                messages: [
                    {
                        type: 'text',
                        text: '請輸入：帳號+空格+要查詢的帳號！',
                    },
                ],
            })
            console.log(dataString)
            reSponse(dataString, token)
        }
    }
}

module.exports = replyMsg
