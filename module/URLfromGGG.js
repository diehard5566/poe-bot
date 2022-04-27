const fetch = require('node-fetch')
// var Bottleneck = require("bottleneck/es5");

// const limiter =  new Bottleneck({
//   maxConcurrent: 1,
//   minTime: 850
// });

const getURLFromGGG = async searchJsonReady => {
    try {
        const requestOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)',
                cookie: 'POESESSID=8e94ba6fc620c449c8d282dcad438ab4',
            },
            body: JSON.stringify(searchJsonReady),
        }
        const delay = time => new Promise(resolve => setTimeout(resolve, time))

        const res = await fetch('https://www.pathofexile.com/api/trade/search/Archnemesis', requestOption)
        await delay(3000)
        const data = await res.json()

        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = getURLFromGGG
