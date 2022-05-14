require('dotenv').config()
const getChar = require('../module/characters')
const allItemURL = require('../module/urlFromGGG').getURLFromGGG
const response = require('./resSetting')
const transferData = require('../module/searchAPI/transferData')
const getItemForSearch = require('../module/searchAPI/searchJson').getItemForSearch
const getItemFromGGG = require('../module/items')
const { replyFlexMsg, replySearchItem } = require('../src/msgForRes/replyForFlex')
const logger = require('../src/logger')
const db = require('../db/connect')
const getItemUsage = require('../module/getUsageFromNinja')
const { replyForResult, replyForSingle, fetchCompleted } = require('../src/msgForRes/replyForGetItem')
const {
    replyDefaultMsg,
    replyForCommand,
    replyForRecourse,
    replyForAccountPrompt,
    replyForTodayLab,
    replyForAbout,
    replyForArchemesis,
    replyForLeveling,
    replyForHeist,
    replyForHarvest,
    replyForLab,
    replyForEarnCurrency,
    replyForWheel,
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
    const notCommand = reqBody.events[0].message.text

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

            let charName = await getCharNameFromDB(commandParam, lineUserId, accountName)

            const getItem = getItemFromGGG[0]
            let dataString = await getItem(reqBody, res, accountName, charName) //拿到該角色身上裝備
            // logger.info(dataString)

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
                for (let i = 1; i < transferredData.length + 1; i++) {
                    allItem = storeInfo.get(`user-${lineUserId}-item-No${i}`)
                    // console.log('我是存在storeInfo裡的item: ', allItem)

                    //把詞綴丟進searchJson function去轉成JSON 最後會回給user的是URL
                    const searchJsonReady = await getItemForSearch(allItem)
                    // console.log(i + '.我是要被丟去給ggg的JSON: ', searchJsonReady)

                    const data = await allItemURL(searchJsonReady)
                    storeInfo.set(`user-${lineUserId}-trade-URL-${data.id}`, data.id)
                    const trade_URL = `https://www.pathofexile.com/trade/search/Sentinel/${storeInfo.get(
                        `user-${lineUserId}-trade-URL-${data.id}`
                    )}`
                    storeInfo.set(`user-${lineUserId}-裝備編號No-${i}`, trade_URL)

                    addUrlToDB(lineUserId, i, trade_URL, charName)
                }

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

                allItemURLFromMap = []
                for (let i = 1; i < tempitemlength + 1; i++) {
                    const tempUrl = await getUrlFromDB(i, lineUserId, charName)
                    //TODO這邊要加charName才知道是選哪隻腳色的裝備

                    allItemURLFromMap.push(`裝備編號No-${i}: ${tempUrl}` + '\n')
                }

                const finalResString = replyForResult(reqBody, allItemURLFromMap)
                response(finalResString, token)
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
        } else if (commandParam[0] === '迷宮') {
            const dataString = await replyForTodayLab(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //about bot
        } else if (commandParam[0] === '關於') {
            const dataString = replyForAbout(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //archemesis
        } else if (commandParam[0] === '宿敵') {
            const dataString = replyForArchemesis(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //leveling
        } else if (commandParam[0] === '章節') {
            const dataString = replyForLeveling(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //heist
        } else if (commandParam[0] === '搶劫') {
            const dataString = replyForHeist(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //wheel
        } else if (commandParam[0] === '下季玩什麼') {
            const dataString = await replyForWheel(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //lab guide
        } else if (commandParam[0] === '迷宮攻略') {
            const dataString = replyForLab(reqBody)
            logger.info(dataString)

            response(dataString, token)

            //making currency
        } else if (commandParam[0] === '發大財') {
            const dataString = replyForEarnCurrency(reqBody)
            logger.info(dataString)

            response(dataString, token)
        } else if (commandParam[0] === '裝備') {
            // TODO some function here
        }
        // default msg
        else {
            const translateList = require('../src/itemTranslate.json')
            const translateToEn = translateList.data.filter(e => e.lang === notCommand)

            if (translateToEn.length === 0) {
                const dataString = replyDefaultMsg(reqBody)
                logger.info(dataString)

                response(dataString, token)
            } else {
                const dataString = await replySearchItem(reqBody, translateToEn[0].us)
                // const usageAndPrice = await getItemUsage(reqBody, notCommand)

                // const dataString = replyDefaultMsg(reqBody)
                logger.info(dataString)
                // logger.info(usageAndPrice)

                response(dataString, token)
                // response(usageAndPrice, token)
            }
        }
    }
}

module.exports = [replyMsg, storeInfo]
