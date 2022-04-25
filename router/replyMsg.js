const fetch = require('node-fetch')
const getChar = require('../module/Char')
const getItemFromGGG = require('../module/Item')
const allItemURL = require('../module/allItemURL')
const reSponse = require('../controller/resSetting')
const tranferData = require('../controller/searchapi/transferData')
const getItemForSearch = require('../controller/searchapi/searchJson')
const { replyForResult, replyDefaultMsg } = require('../src/msgForRes/replyForGetItem')

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
            // accountName = storeInfo.get(`lineUserId-${lineUserId}`)
            const getAllItem = getItemFromGGG[1]
            // console.log('我是該角色全部裝備data', getAllItem)

            const transferedData = tranferData(getAllItem)
            // console.log('我是裝備細節：', transferedData.length)

            for (let i = 0; i < transferedData.length; i++) {
                const eachItemKey = transferedData[i]
                // console.log(eachItem)
                storeInfo.set(`user-${lineUserId}-item-No${i + 1}`, eachItemKey)
                // console.log('我是存在Map裡面的每個item：', storeInfo)
            }

            let allItem
            let allResultURL = []
            for (let i = 1; i < transferedData.length + 1; i++) {
                allItem = storeInfo.get(`user-${lineUserId}-item-No${i}`)
                // console.log('我是存在storeInfo裡的item: ', allItem)

                // const singleItem = storeInfo.get(`user-${lineUserId}-item-No${commandParam[1]}`)
                // console.log('我是user選的單一裝備：', singleItem)

                //把詞綴丟進searchJson function去轉成JSON 最後會回給user的是URL
                const searchJsonReady = await getItemForSearch(allItem) //singleItem
                console.log(i + '.我是要被丟去給ggg的JSON: ', searchJsonReady)

                const data = await allItemURL(searchJsonReady)
                // const requestOption = {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Accept: 'application/json',
                //         'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)',
                //     },
                //     body: JSON.stringify(searchJsonReady),
                // }
                // try {
                //     const delay = time => new Promise(resolve => setTimeout(resolve, time))

                //     const res = await fetch('https://www.pathofexile.com/api/trade/search/Archnemesis', requestOption)
                //     await delay(900)
                //     const data = await res.json()
                //     // console.log(data)
                //     // const resultLines = data.result.join(',')
                //     // console.log(resultLines)
                storeInfo.set(`user-${lineUserId}-trade-URL-${data.id}`, data.id)
                const trade_URL = `https://www.pathofexile.com/trade/search/Archnemesis/${storeInfo.get(
                    `user-${lineUserId}-trade-URL-${data.id}`
                )}`

                allResultURL.push(`裝備編號No-${i}: ${trade_URL}` + '\n')
                // } catch (error) {
                //     console.log(error)
                // }
            }

            console.log(allResultURL)
            const dataString = replyForResult(reqBody, allResultURL)

            console.log(dataString)
            reSponse(dataString, token)
        } else {
            const dataString = replyDefaultMsg(reqBody)
            console.log(dataString)
            reSponse(dataString, token)
        }
    }
}

module.exports = [replyMsg, storeInfo]
