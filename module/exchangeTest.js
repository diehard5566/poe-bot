const fetch = require('node-fetch')
const redis = require('redis')

const redisPort = 6397
const client = redis.createClient(redisPort)

client.on('connect', () => {
    console.log('Redis client connected')
})

client.connect()

const exchangeInfo = new Map()

const getExchange = async () => {
    const ninjaAPI = 'https://poe.ninja/api/data/CurrencyHistory?league=Archnemesis&type=Currency&currencyId='
    const ninjaOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }

    //----------------------------------------------------------------
    // ex redis test
    let currentEx = await client.get('currentEx')

    if (currentEx != null) {
        console.log('Redis有EX data!')
        console.log('我是redis今天ex價：', currentEx) // TODO:only ex is different
    } else {
        console.log('沒有EX data！！！！')

        const res1 = await fetch(ninjaAPI + '2', ninjaOption)
        const exaltedOrb = await res1.json()
        currentEx = Math.round(
            exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
        ).toString()
        await client.setEx('currentEx', 30, currentEx)

        console.log('我是redis沒有EX的時候存進去：', typeof currentEx, currentEx)
        // return currentEx
    }
    const todayExPrice = currentEx

    //----------------------------------------------------------------

    //mirror
    // const res0 = await fetch(ninjaAPI + '22', ninjaOption)
    // const mirror = await res0.json()
    // const currentMirror = Math.round(
    //     mirror.receiveCurrencyGraphData[mirror.receiveCurrencyGraphData.length - 1].value / currentEx
    // )
    // exchangeInfo.set('currentMirror', currentMirror)
    // const todayMirrorPrice = exchangeInfo.get('currentMirror')

    //--------swap mirror redis
    let currentMirror = await client.get('currentMirror')

    if (currentMirror != null) {
        console.log('Redis有mirror data!')
        console.log('我是redis今天mirror價：', currentMirror) // TODO return later
    } else {
        console.log('沒有mirror data！！！！')

        const res0 = await fetch(ninjaAPI + '22', ninjaOption)
        const mirror = await res0.json()
        currentMirror = Math.round(
            mirror.receiveCurrencyGraphData[mirror.receiveCurrencyGraphData.length - 1].value / Number(currentEx)
        ).toString()
        await client.setEx('currentMirror', 30, currentMirror)

        console.log('我是redis沒有mirror的時候存進去：', currentMirror)
    }

    const todayMirrorPrice = currentMirror
    //c
    const chaos = 1

    //alt
    // const res2 = await fetch(ninjaAPI + '6', ninjaOption)
    // const alt = await res2.json()
    // const altExchange =
    //     Math.round(alt.receiveCurrencyGraphData[alt.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentAlt = Math.round(+(chaos / altExchange).toFixed(3)) * currentEx
    // exchangeInfo.set('currentAlt', currentAlt)
    // const todayAltPrice = exchangeInfo.get('currentAlt')

    //swap alt to redis

    let currentAlt = await client.get('currentAlt')

    if (currentAlt) {
        console.log('Redis有alt data!')
        console.log('我是redis今天alt價：', currentAlt) // TODO return later
    } else {
        console.log('沒有alt data！！！！')

        const res2 = await fetch(ninjaAPI + '6', ninjaOption)
        const alt = await res2.json()
        const altExchange =
            Math.round(alt.receiveCurrencyGraphData[alt.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentAlt = (Math.round(+(chaos / altExchange).toFixed(3)) * Number(currentEx)).toString()
        await client.setEx('currentAlt', 30, currentAlt)

        console.log('我是redis沒有alt的時候存進去：', currentAlt)
    }

    const todayAltPrice = currentAlt

    //scouring
    // const res3 = await fetch(ninjaAPI + '14', ninjaOption)
    // const scouring = await res3.json()
    // const scoExchange =
    //     Math.round(scouring.receiveCurrencyGraphData[scouring.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentSco = Math.round(+(chaos / scoExchange).toFixed(3) * currentEx)
    // exchangeInfo.set('currentSco', currentSco)
    // const todayScoPrice = exchangeInfo.get('currentSco')

    //swap sco to redis
    let currentSco = await client.get('currentSco')

    if (currentSco) {
        console.log('Redis有Sco data!')
        console.log('我是redis今天Sco價：', currentSco) // TODO return later
    } else {
        console.log('沒有Sco data！！！！')

        const res3 = await fetch(ninjaAPI + '14', ninjaOption)
        const scouring = await res3.json()
        const scoExchange =
            Math.round(scouring.receiveCurrencyGraphData[scouring.receiveCurrencyGraphData.length - 1].value * 100) /
            100
        currentSco = Math.round(+(chaos / scoExchange).toFixed(3) * Number(currentEx)).toString()
        await client.setEx('currentSco', 30, currentSco)

        console.log('我是redis沒有Sco的時候存進去：', currentSco)
    }
    const todayScoPrice = currentSco

    //fusing
    // const res4 = await fetch(ninjaAPI + '5', ninjaOption)
    // const fusing = await res4.json()
    // const fusExchange =
    //     Math.round(fusing.receiveCurrencyGraphData[fusing.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentFus = Math.round(+(chaos / fusExchange).toFixed(1) * currentEx)
    // exchangeInfo.set('currentFus', currentFus)
    // const todayFusPrice = exchangeInfo.get('currentFus')

    //swap fus to redis
    let currentFus = await client.get('currentFus')

    if (currentFus) {
        console.log('Redis有Fus data!')
        console.log('我是redis今天Fus價：', currentFus) // TODO return later
    } else {
        console.log('沒有Fus data！！！！')

        const res4 = await fetch(ninjaAPI + '5', ninjaOption)
        const fusing = await res4.json()
        const fusExchange =
            Math.round(fusing.receiveCurrencyGraphData[fusing.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentFus = Math.round(+(chaos / fusExchange).toFixed(1) * Number(currentEx)).toString()
        await client.setEx('currentFus', 30, currentFus)

        console.log('我是redis沒有Fus的時候存進去：', currentFus)
    }
    const todayFusPrice = currentFus

    //regret
    // const res5 = await fetch(ninjaAPI + '9', ninjaOption)
    // const regret = await res5.json()
    // const regExchange =
    //     Math.round(regret.receiveCurrencyGraphData[regret.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentReg = +(chaos / regExchange).toFixed(2)
    // exchangeInfo.set('currentReg', currentReg)
    // const todayRegPrice = exchangeInfo.get('currentReg')

    //swap reg to redis
    let currentReg = await client.get('currentReg')

    if (currentReg) {
        console.log('Redis有Reg data!')
        console.log('我是redis今天Reg價：', currentReg) // TODO return later
    } else {
        console.log('沒有Reg data！！！！')

        const res5 = await fetch(ninjaAPI + '9', ninjaOption)
        const regret = await res5.json()
        const regExchange =
            Math.round(regret.receiveCurrencyGraphData[regret.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentReg = (+(chaos / regExchange).toFixed(2)).toString()
        await client.setEx('currentReg', 30, currentReg)

        console.log('我是redis沒有Reg的時候存進去：', currentReg)
    }
    const todayRegPrice = currentReg

    //vaal orb
    // const res6 = await fetch(ninjaAPI + '8', ninjaOption)
    // const vaalOrb = await res6.json()
    // const vaalExchange =
    //     Math.round(vaalOrb.receiveCurrencyGraphData[vaalOrb.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentVaal = +(chaos / vaalExchange).toFixed(1) * currentEx
    // exchangeInfo.set('currentVaal', currentVaal)
    // const todayVaalPrice = exchangeInfo.get('currentVaal')

    //swap vaal to redis
    let currentVaal = await client.get('currentVaal')

    if (currentVaal) {
        console.log('Redis有Vaal data!')
        console.log('我是redis今天Vaal價：', currentVaal) // TODO return later
    } else {
        console.log('沒有Vaal data！！！！')

        const res6 = await fetch(ninjaAPI + '8', ninjaOption)
        const vaalOrb = await res6.json()
        const vaalExchange =
            Math.round(vaalOrb.receiveCurrencyGraphData[vaalOrb.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentVaal = (+(chaos / vaalExchange).toFixed(1) * Number(currentEx)).toString()
        await client.setEx('currentVaal', 30, currentVaal)

        console.log('我是redis沒有Vaal的時候存進去：', currentVaal)
    }
    const todayVaalPrice = currentVaal

    //alc
    // const res7 = await fetch(ninjaAPI + '4', ninjaOption)
    // const alc = await res7.json()
    // const alcExchange =
    //     Math.round(alc.receiveCurrencyGraphData[alc.receiveCurrencyGraphData.length - 1].value * 100) / 100
    // const currentAlc = Math.round(+(chaos / alcExchange).toFixed(3))
    // exchangeInfo.set('currentAlc', currentAlc)
    // const todayAlcPrice = exchangeInfo.get('currentAlc')

    //swap alc to redis
    let currentAlc = await client.get('currentAlc')

    if (currentAlc) {
        console.log('Redis有Alc data!')
        console.log('我是redis今天Alc價：', currentAlc) // TODO return later
    } else {
        console.log('沒有Alc data！！！！')

        const res7 = await fetch(ninjaAPI + '4', ninjaOption)
        const alc = await res7.json()
        const alcExchange =
            Math.round(alc.receiveCurrencyGraphData[alc.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentAlc = Math.round(+(chaos / alcExchange).toFixed(3)).toString()
        await client.setEx('currentAlc', 30, currentAlc)

        console.log('我是redis沒有Alc的時候存進去：', currentAlc)
    }
    const todayAlcPrice = currentAlc

    return {
        Ex: todayExPrice,
        Mirror: todayMirrorPrice,
        Alt: todayAltPrice,
        Sco: todayScoPrice,
        Fus: todayFusPrice,
        Reg: todayRegPrice,
        Vaal: todayVaalPrice,
        Alc: todayAlcPrice,
    }
}

// getExchange()
module.exports = getExchange
