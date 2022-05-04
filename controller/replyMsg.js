const getChar = require('../module/Char')
const getItemFromGGG = require('../module/Item')
const allItemURL = require('../module/URLfromGGG')
const reSponse = require('./resSetting')
const tranferData = require('../module/searchapi/transferData')
const getItemForSearch = require('../module/searchapi/searchJson')
const { replyForResult, replyForSingle, fetchCompleted } = require('../src/msgForRes/replyForGetItem')
const replyFlexMsg = require('../src/msgForRes/rlyForFlex')
const { replyDefaultMsg, replyForCommand } = require('../src/msgForRes/rlpForDefault')
const logger = require('../src/logger')
const db = require('../db/connect')
require('dotenv').config()
const {
    checkAndInsert,
    getAccountFromDB,
    getCharNameFromDB,
    addUrlToDB,
    getUrlFromDB,
} = require('../module/dbFn/forDBquery')

const token = process.env.LINE_ACCESS_TOKEN

//用Map去存帳號
const storeInfo = new Map()

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
            await checkAndInsert(commandParam, lineUserId)

            db.execute(`SELECT * FROM main LIMIT 100`)
                .then(data => {
                    console.log('im from db', data[0])
                })
                .catch(err => {
                    console.log(err)
                })

            accountName = await getAccountFromDB(lineUserId)

            dataFromgetChar = await getChar(reqBody, res, accountName)

            const dataString = dataFromgetChar[0] //await getChar(reqBody, res, accountName)
            console.log('dataString: ', dataString)
            //send request
            reSponse(dataString, token)

            for (let i = 0; i < dataFromgetChar[1].length; i++) {
                db.execute(
                    `INSERT INTO character_info (character_name, line_id,character_num)
                    VALUES('${dataFromgetChar[1][i]}','${lineUserId}','${i + 1}')
                    ON DUPLICATE KEY UPDATE    
                    character_name='${dataFromgetChar[1][i]}', line_id='${lineUserId}',character_num='${i + 1}'`
                )
                    .then(data => {
                        logger.info(data[0]) //'Process done!'
                    })
                    .catch(err => {
                        logger.error(err)
                    })
            }

            //輸入角色編號,取得身上裝備
        } else if (commandParam[0] === '編號') {
            accountName = await getAccountFromDB(lineUserId) //TODO 換成從DB拿出來

            // db.execute(
            //     `SELECT character_name FROM character_info
            //      WHERE character_num = '${commandParam[1]}' AND line_id = '${lineUserId}'`
            // )
            //     .then(data => {
            //         logger.info(data[0])
            //     })
            //     .catch(err => {
            //         logger.info(err)
            //     })

            // let charKey = `user-${lineUserId}-charId` + commandParam[1]
            // console.log('storeInfo MAP: ', storeInfo)

            // dataFromgetChar = await getChar(reqBody, res, accountName)
            // console.log('dataFromgetChar:', dataFromgetChar)

            // storeInfo.set(charKey, dataFromgetChar[1][commandParam[1] - 1]) //TODO 換成DB

            let charName = await getCharNameFromDB(commandParam, lineUserId) //storeInfo.get(charKey) //TODO 換成DB

            // console.log(storeInfo)

            const getItem = getItemFromGGG[0]
            const dataString = await getItem(reqBody, res, accountName, charName) //拿到該角色身上裝備
            logger.info(dataString)

            //send request
            reSponse(dataString, token)

            //輸入裝備編號,取得各個裝備的賣場搜尋結果

            // } else if (commandParam[0] === '裝備') {

            // accountName = storeInfo.get(`lineUserId-${lineUserId}`)
            const getAllItem = getItemFromGGG[1]
            // console.log('我是該角色全部裝備data', getAllItem)

            const transferedData = tranferData(getAllItem)
            // console.log('我是裝備細節：', transferedData.length)

            for (let i = 0; i < transferedData.length; i++) {
                const eachItemKey = transferedData[i]

                storeInfo.set(`user-${lineUserId}-item-No${i + 1}`, eachItemKey)
                // console.log('我是存在Map裡面的每個item：', storeInfo)
            }

            let allItem
            let allResultURL = []
            for (let i = 1; i < transferedData.length + 1; i++) {
                allItem = storeInfo.get(`user-${lineUserId}-item-No${i}`)
                // console.log('我是存在storeInfo裡的item: ', allItem)

                //把詞綴丟進searchJson function去轉成JSON 最後會回給user的是URL
                const searchJsonReady = await getItemForSearch(allItem) //singleItem
                // console.log(i + '.我是要被丟去給ggg的JSON: ', searchJsonReady)

                const data = await allItemURL(searchJsonReady)
                storeInfo.set(`user-${lineUserId}-trade-URL-${data.id}`, data.id)
                const trade_URL = `https://www.pathofexile.com/trade/search/Archnemesis/${storeInfo.get(
                    `user-${lineUserId}-trade-URL-${data.id}`
                )}`
                storeInfo.set(`user-${lineUserId}-裝備編號No-${i}`, trade_URL) //TODO 換成DB

                addUrlToDB(lineUserId, i, trade_URL)

                allResultURL.push(`裝備編號No-${i}: ${trade_URL}` + '\n')
            }

            console.log('我應該是ARC: ', charName)
            //這段目前沒用 應該是因為沒有收到commandParam
            // if (allResultURL) {
            //     const completedMsg = fetchCompleted(reqBody)

            //     console.log(completedMsg)
            //     reSponse(completedMsg, token)
            // }

            //裝備官方賣場URL

            //TODO:這邊要跟上面合併,打編號直接show出allItemURLFromMap,再讓user選
            //TODO:所以rlymsg也要一併改動
        } else if (commandParam[0] === '裝備') {
            // const getAllItem = getItemFromGGG[1]
            // const transferedData = tranferData(getAllItem)

            const tempitemlength = await db
                .execute(
                    `SELECT MAX(item_num) FROM item_info
                WHERE line_id = '${lineUserId}' `
                )
                .then(data => {
                    return Object.values(data[0][0])[0]
                })
                .catch(err => console.log(err))
            console.log('-----------', tempitemlength)

            allItemURLFromMap = []

            for (let i = 1; i < tempitemlength + 1; i++) {
                //知道總共有幾個裝備
                const tempUrl = await getUrlFromDB(i, lineUserId)

                allItemURLFromMap.push(`裝備編號No-${i}: ${tempUrl}` + '\n')
            } //TODO take from db
            console.log('我應該要存進DB: ', allItemURLFromMap) //TODO take from db and store in array

            //讓user選特定裝備

            let dataString
            if (commandParam[1]) {
                const singleItem = allItemURLFromMap[commandParam[1] - 1] //抓裝備編號
                dataString = replyForSingle(reqBody, singleItem)
                reSponse(dataString, token)
            } else {
                dataString = replyForResult(reqBody, allItemURLFromMap)
                reSponse(dataString, token)
            }

            console.log(dataString)

            // console.log(storeInfo)

            //用flex msg 查通貨價格
        } else if (commandParam[0] === '通貨') {
            const dataString = await replyFlexMsg(reqBody)
            logger.info(dataString)
            reSponse(dataString, token)

            //command
        } else if (commandParam[0] === '指令') {
            const dataString = replyForCommand(reqBody)
            logger.info(dataString)
            reSponse(dataString, token)
        }
        // default msg
        else {
            const dataString = replyDefaultMsg(reqBody)
            logger.info(dataString)
            reSponse(dataString, token)
        }
    }
}

module.exports = [replyMsg, storeInfo]
