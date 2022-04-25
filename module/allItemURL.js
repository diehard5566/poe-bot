const fetch = require('node-fetch')

const getURLFromGGG = async searchJsonReady => {
    try {
        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)',
            },
            body: JSON.stringify(searchJsonReady),
        }
        const delay = time => new Promise(resolve => setTimeout(resolve, time))

        const res = await fetch('https://www.pathofexile.com/api/trade/search/Archnemesis', requestOption)
        await delay(950)
        const data = await res.json()
        // console.log(data)
        // const resultLines = data.result.join(',')
        // console.log(resultLines)
        // storeInfo.set(`user-${lineUserId}-trade-URL-${data.id}`, data.id)
        // const trade_URL = `https://www.pathofexile.com/trade/search/Archnemesis/${storeInfo.get(
        //     `user-${lineUserId}-trade-URL-${data.id}`
        // )}`

        // allResultURL.push(`裝備編號No-${i}: ${trade_URL}` + '\n')
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = getURLFromGGG
