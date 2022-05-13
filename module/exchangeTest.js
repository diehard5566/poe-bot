const fetch = require('node-fetch')
const redis = require('redis')
const logger = require('../src/logger')

const redisPort = 6397
const client = redis.createClient(redisPort)

client.on('connect', () => {
    console.log('Redis client connected')
})

client.connect()

const getExchange = async () => {
    const ninjaAPI = 'https://poe.ninja/api/data/CurrencyHistory?league=Archnemesis&type=Currency&currencyId=' //TODO 要改成新聯盟 Sentinel
    const ninjaOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }

    // ex redis
    let currentEx = await client.get('currentEx')

    if (currentEx != null) {
        logger.info('我是redis今天ex價：', currentEx)
    } else {
        const res1 = await fetch(ninjaAPI + '2', ninjaOption)
        const exaltedOrb = await res1.json()
        currentEx = Math.round(
            exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
        ).toString()
        await client.setEx('currentEx', 30, currentEx)
    }
    const todayExPrice = currentEx

    // mirror redis
    let currentMirror = await client.get('currentMirror')

    if (currentMirror != null) {
        logger.info(currentMirror)
    } else {
        const res0 = await fetch(ninjaAPI + '22', ninjaOption)
        const mirror = await res0.json()
        currentMirror = Math.round(
            mirror.receiveCurrencyGraphData[mirror.receiveCurrencyGraphData.length - 1].value / Number(currentEx)
        ).toString()
        await client.setEx('currentMirror', 30, currentMirror)
    }

    const todayMirrorPrice = currentMirror

    //c
    const chaos = 1

    // alt redis

    let currentAlt = await client.get('currentAlt')

    if (currentAlt) {
        logger.info(currentAlt)
    } else {
        const res2 = await fetch(ninjaAPI + '6', ninjaOption)
        const alt = await res2.json()
        const altExchange =
            Math.round(alt.receiveCurrencyGraphData[alt.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentAlt = (Math.round(+(chaos / altExchange).toFixed(3)) * Number(currentEx)).toString()
        await client.setEx('currentAlt', 30, currentAlt)
    }

    const todayAltPrice = currentAlt

    // sco redis
    let currentSco = await client.get('currentSco')

    if (currentSco) {
        logger.info(currentSco)
    } else {
        const res3 = await fetch(ninjaAPI + '14', ninjaOption)
        const scouring = await res3.json()
        const scoExchange =
            Math.round(scouring.receiveCurrencyGraphData[scouring.receiveCurrencyGraphData.length - 1].value * 100) /
            100
        currentSco = Math.round(+(chaos / scoExchange).toFixed(3) * Number(currentEx)).toString()
        await client.setEx('currentSco', 30, currentSco)
    }

    const todayScoPrice = currentSco

    //fus redis
    let currentFus = await client.get('currentFus')

    if (currentFus) {
        logger.info(currentFus)
    } else {
        const res4 = await fetch(ninjaAPI + '5', ninjaOption)
        const fusing = await res4.json()
        const fusExchange =
            Math.round(fusing.receiveCurrencyGraphData[fusing.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentFus = Math.round(+(chaos / fusExchange).toFixed(1) * Number(currentEx)).toString()
        await client.setEx('currentFus', 30, currentFus)
    }

    const todayFusPrice = currentFus

    //reg redis
    let currentReg = await client.get('currentReg')

    if (currentReg) {
        logger.info(currentReg)
    } else {
        const res5 = await fetch(ninjaAPI + '9', ninjaOption)
        const regret = await res5.json()
        const regExchange =
            Math.round(regret.receiveCurrencyGraphData[regret.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentReg = (+(chaos / regExchange).toFixed(2)).toString()
        await client.setEx('currentReg', 30, currentReg)
    }

    const todayRegPrice = currentReg

    //vaal redis
    let currentVaal = await client.get('currentVaal')

    if (currentVaal) {
        logger.info(currentVaal)
    } else {
        const res6 = await fetch(ninjaAPI + '8', ninjaOption)
        const vaalOrb = await res6.json()
        const vaalExchange =
            Math.round(vaalOrb.receiveCurrencyGraphData[vaalOrb.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentVaal = (+(chaos / vaalExchange).toFixed(1) * Number(currentEx)).toString()
        await client.setEx('currentVaal', 30, currentVaal)
    }

    const todayVaalPrice = currentVaal

    //alc redis
    let currentAlc = await client.get('currentAlc')

    if (currentAlc) {
        logger.info(currentAlc)
    } else {
        const res7 = await fetch(ninjaAPI + '4', ninjaOption)
        const alc = await res7.json()
        const alcExchange =
            Math.round(alc.receiveCurrencyGraphData[alc.receiveCurrencyGraphData.length - 1].value * 100) / 100
        currentAlc = Math.round(+(chaos / alcExchange).toFixed(3)).toString()
        await client.setEx('currentAlc', 30, currentAlc)
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
