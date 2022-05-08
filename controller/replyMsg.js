require('dotenv').config()
const getChar = require('../module/characters')
const allItemURL = require('../module/urlFromGGG')
const response = require('./resSetting')
const transferData = require('../module/searchAPI/transferData')
const getItemForSearch = require('../module/searchAPI/searchJson')
const getItemFromGGG = require('../module/items')
const replyFlexMsg = require('../src/msgForRes/replyForFlex').replyFlexMsg
const logger = require('../src/logger')
const db = require('../db/connect')
const { replyForResult, replyForSingle, fetchCompleted } = require('../src/msgForRes/replyForGetItem')
const {
    replyDefaultMsg,
    replyForCommand,
    replyForRecourse,
    replyForAccountPrompt,
    replyForTodayLab,
    replyForAbout,
} = require('../src/msgForRes/replyForDefault')
const {
    checkAndInsert,
    getAccountFromDB,
    getCharNameFromDB,
    addUrlToDB,
    getUrlFromDB,
    addLineIDToDB,
} = require('../module/dbutil/forDBquery')

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
            response(dataString, token)

            for (let i = 0; i < dataFromgetChar[1].length; i++) {
                db.execute(
                    //TODO wrap to fn
                    `INSERT INTO character_info (character_name, line_id, character_num, account )
                    VALUES('${dataFromgetChar[1][i]}','${lineUserId}','${i + 1}','${accountName}')
                    ON DUPLICATE KEY UPDATE    
                    line_id='${lineUserId}',character_num='${i + 1}',account = '${accountName}'`
                )
                    .then(data => {
                        logger.info(data[0]) //'Process done!'character_name='${dataFromgetChar[1][i]}',
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

            let charName = await getCharNameFromDB(commandParam, lineUserId, accountName) //storeInfo.get(charKey) //TODO 換成DB

            // console.log(storeInfo)

            const getItem = getItemFromGGG[0]
            let dataString = await getItem(reqBody, res, accountName, charName) //拿到該角色身上裝備
            // logger.info(dataString)

            //send request

            //輸入裝備編號,取得各個裝備的賣場搜尋結果

            // } else if (commandParam[0] === '裝備') {

            // accountName = storeInfo.get(`lineUserId-${lineUserId}`)
            const getAllItem = getItemFromGGG[1]
            // console.log('我是該角色全部裝備data', getAllItem)

            const transferredData = transferData(getAllItem)
            // console.log('我是裝備細節：', transferredData)

            if (transferredData.length === 0) {
                response(dataString, token) //沒穿裝的角色
                logger.info(dataString)
            } else {
                for (let i = 0; i < transferredData.length; i++) {
                    const eachItemKey = transferredData[i]

                    storeInfo.set(`user-${lineUserId}-item-No${i + 1}`, eachItemKey)
                    // console.log('我是存在Map裡面的每個item：', storeInfo)
                }

                let allItem
                // let allResultURL = []
                for (let i = 1; i < transferredData.length + 1; i++) {
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

                    addUrlToDB(lineUserId, i, trade_URL, charName)

                    // allResultURL.push(`裝備編號No-${i}: ${trade_URL}` + '\n')
                }

                //這段目前沒用 應該是因為沒有收到commandParam
                // if (allResultURL) {
                //     const completedMsg = fetchCompleted(reqBody)

                //     console.log(completedMsg)
                //     response(completedMsg, token)
                // }

                //裝備官方賣場URL

                //TODO:這邊要跟上面合併,打編號直接show出allItemURLFromMap
                //TODO:所以rlymsg也要一併改動

                // const getAllItem = getItemFromGGG[1]
                // const transferedData = tranferData(getAllItem)

                const tempitemlength = await db //知道總共有幾個裝備
                    .execute(
                        `SELECT MAX(item_num) FROM item_info
                    WHERE line_id = '${lineUserId}' 
                    AND character_name = '${charName}' `
                    )
                    .then(data => {
                        return Object.values(data[0][0])[0]
                    })
                    .catch(err => console.log(err))
                console.log('-----------', tempitemlength)

                allItemURLFromMap = []
                for (let i = 1; i < tempitemlength + 1; i++) {
                    const tempUrl = await getUrlFromDB(i, lineUserId, charName)
                    //TODO這邊要加charName才知道是選哪隻腳色的裝備

                    allItemURLFromMap.push(`裝備編號No-${i}: ${tempUrl}` + '\n')
                }

                // //讓user選特定裝備

                // if (commandParam[1]) {
                //     const singleItem = allItemURLFromMap[commandParam[1] - 1] //抓裝備編號
                //     const dataString = replyForSingle(reqBody, singleItem)
                //     response(dataString, token)
                // } else {
                const finalResString = replyForResult(reqBody, allItemURLFromMap)
                response(finalResString, token)
                // }

                logger.info(finalResString)
            }

            //用flex msg 查通貨價格
        } else if (commandParam[0] === '通貨') {
            const dataString = await replyFlexMsg(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //command
        } else if (commandParam[0] === '指令') {
            addLineIDToDB(lineUserId)

            const dataString = replyForCommand(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //useful link
        } else if (commandParam[0] === '連結') {
            const dataString = replyForRecourse(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //account prompt
        } else if (commandParam[0] === '稽查') {
            const dataString = replyForAccountPrompt(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //todays lab
        } else if (commandParam[0] === 'lab') {
            const dataString = replyForTodayLab(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //about bot
        } else if (commandParam[0] === 'about') {
            const dataString = replyForAbout(reqBody)
            logger.info(dataString)

            response(dataString, token)
        }
        // default msg
        else {
            const dataString = replyDefaultMsg(reqBody)
            logger.info(dataString)
            response(dataString, token)
        }
    }
}

module.exports = [replyMsg, storeInfo]
