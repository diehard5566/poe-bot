const fetch = require('node-fetch')

const exchangeInfo = new Map()

const getExchange = async () => {
    const ninjaAPI = 'https://poe.ninja/api/data/CurrencyHistory?league=Sentinel&type=Currency&currencyId='
    const ninjaOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }

    //ex
    const res1 = await fetch(ninjaAPI + '2', ninjaOption)
    const exaltedOrb = await res1.json()
    const currentEx = Math.round(
        exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
    )
    exchangeInfo.set('currentEx', currentEx)
    const todayExPrice = exchangeInfo.get('currentEx')

    //mirror
    const res0 = await fetch(ninjaAPI + '22', ninjaOption)
    const mirror = await res0.json()
    const currentMirror = Math.round(
        mirror.receiveCurrencyGraphData[mirror.receiveCurrencyGraphData.length - 1].value / currentEx
    )
    exchangeInfo.set('currentMirror', currentMirror)
    const todayMirrorPrice = exchangeInfo.get('currentMirror')

    //c
    const chaos = 1

    //alt
    const res2 = await fetch(ninjaAPI + '6', ninjaOption)
    const alt = await res2.json()
    const altExchange =
        Math.round(alt.receiveCurrencyGraphData[alt.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentAlt = Math.round(+(chaos / altExchange).toFixed(3)) * currentEx
    exchangeInfo.set('currentAlt', currentAlt)
    const todayAltPrice = exchangeInfo.get('currentAlt')

    //scouring
    const res3 = await fetch(ninjaAPI + '14', ninjaOption)
    const scouring = await res3.json()
    const scoExchange =
        Math.round(scouring.receiveCurrencyGraphData[scouring.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentSco = Math.round(+(chaos / scoExchange).toFixed(3) * currentEx)
    exchangeInfo.set('currentSco', currentSco)
    const todayScoPrice = exchangeInfo.get('currentSco')

    //fusing
    const res4 = await fetch(ninjaAPI + '5', ninjaOption)
    const fusing = await res4.json()
    const fusExchange =
        Math.round(fusing.receiveCurrencyGraphData[fusing.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentFus = Math.round(+(chaos / fusExchange).toFixed(1) * currentEx)
    exchangeInfo.set('currentFus', currentFus)
    const todayFusPrice = exchangeInfo.get('currentFus')

    //regret
    const res5 = await fetch(ninjaAPI + '9', ninjaOption)
    const regret = await res5.json()
    const regExchange =
        Math.round(regret.receiveCurrencyGraphData[regret.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentReg = +(chaos / regExchange).toFixed(2)
    exchangeInfo.set('currentReg', currentReg)
    const todayRegPrice = exchangeInfo.get('currentReg')

    //vaal orb
    const res6 = await fetch(ninjaAPI + '8', ninjaOption)
    const vaalOrb = await res6.json()
    const vaalExchange =
        Math.round(vaalOrb.receiveCurrencyGraphData[vaalOrb.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentVaal = +(chaos / vaalExchange).toFixed(1) * currentEx
    exchangeInfo.set('currentVaal', currentVaal)
    const todayVaalPrice = exchangeInfo.get('currentVaal')

    //alc
    const res7 = await fetch(ninjaAPI + '4', ninjaOption)
    const alc = await res7.json()
    const alcExchange =
        Math.round(alc.receiveCurrencyGraphData[alc.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentAlc = Math.round(+(chaos / alcExchange).toFixed(3))
    exchangeInfo.set('currentAlc', currentAlc)
    const todayAlcPrice = exchangeInfo.get('currentAlc')

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
