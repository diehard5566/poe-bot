const fetch = require('node-fetch')

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

    //ex
    const res = await fetch(ninjaAPI + '2', ninjaOption)
    const exaltedOrb = await res.json()
    const currentEx = Math.round(
        exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
    )
    exchangeInfo.set('currentEx', currentEx)
    const todayExPrice = exchangeInfo.get('currentEx')

    //c
    const chaos = 1

    //alt
    const res2 = await fetch(ninjaAPI + '6', ninjaOption)
    const alt = await res2.json()
    const altNoExchang =
        Math.round(alt.receiveCurrencyGraphData[alt.receiveCurrencyGraphData.length - 1].value * 100) / 100
    const currentAlt = Math.round(+(chaos / altNoExchang).toFixed(3)) * currentEx
    exchangeInfo.set('currentAlt', currentAlt)
    const todayAltPrice = exchangeInfo.get('currentAlt')

    return {
        Ex: todayExPrice,
        Alt: todayAltPrice,
    }
}

// getExchange()
module.exports = getExchange
