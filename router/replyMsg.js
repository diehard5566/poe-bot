const getChar = require('../controller/getChar')
const getItemFromGGG = require('../controller/getItem')
const reSponse = require('../controller/resSetting')
const tranferData = require('../searchapi/transferData')

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
const storeEachItemInfo = new Map()

const replyMsg = async (reqBody, res) => {
    const reqBodyMsg = reqBody.events[0].type
    const commandParam = reqBody.events[0].message.text.split(' ')

    const lineUserId = reqBody.events[0].source.userId
    let accountName
    let dataFromgetChar

    if (reqBodyMsg === 'message') {
        //把lienID跟帳號綁定
        //輸入帳號，取得角色列表
        if (commandParam[0] === '帳號') {
            storeInfo.set(`lineUserId-${lineUserId}`, commandParam[1])

            accountName = storeInfo.get(`lineUserId-${lineUserId}`)
            console.log('storeInfo:', storeInfo)

            dataFromgetChar = await getChar(reqBody, res, accountName)

            const dataString = dataFromgetChar[0] //await getChar(reqBody, res, accountName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)
        }

        //輸入角色編號,取得身上裝備
        else if (commandParam[0] === '編號') {
            accountName = storeInfo.get(`lineUserId-${lineUserId}`)

            let charKey = `user-${lineUserId}-charId` + commandParam[1]

            dataFromgetChar = await getChar(reqBody, res, accountName)

            storeInfo.set(charKey, dataFromgetChar[1][commandParam[1] - 1])

            let charName = storeInfo.get(charKey)

            console.log(storeInfo)

            const getItem = getItemFromGGG[0]
            const dataString = await getItem(reqBody, res, accountName, charName)
            console.log('dataString: ', dataString)

            //send request
            reSponse(dataString, token)
            //輸入裝備編號,取得各個裝備的賣場搜尋結果
        } else if (commandParam[0] === '裝備') {
            const getAllItem = getItemFromGGG[1]
            // console.log('我是該角色全部裝備data', getAllItem)

            const transferedData = tranferData(getAllItem)
            // console.log('我是裝備細節：', transferedData)

            for (let i = 0; i < transferedData.length; i++) {
                const eachItem = transferedData[i]
                // console.log(eachItem)
                storeEachItemInfo.set(`item-No${i + 1}`, eachItem)
                // console.log('我是存在Map裡面的每個item：', storeEachItemInfo)
            }
            const singleItem = storeEachItemInfo.get(`item-No${commandParam[1]}`)
            console.log('我是user選的單一裝備：', singleItem)

            //TODO 把singleItem丟進searchJson function去轉成JSON 最後會回給user的是URL
        } else {
            const dataString = JSON.stringify({
                replyToken: reqBody.events[0].replyToken,
                messages: [
                    {
                        type: 'text',
                        text: '請輸入：帳號+空格+要查詢的帳號！ 例如："帳號 xxxxx"',
                    },
                ],
            })
            console.log(dataString)
            reSponse(dataString, token)
        }
    }
}

module.exports = [replyMsg, storeInfo]
