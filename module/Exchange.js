const fetch = require('node-fetch')

const getExchange = async () => {
    const res = await fetch(
        'https://poe.ninja/api/data/CurrencyHistory?league=Archnemesis&type=Currency&currencyId=2',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )

    const exaltedOrb = await res.json()
    const currentEx = Math.round(
        exaltedOrb.receiveCurrencyGraphData[exaltedOrb.receiveCurrencyGraphData.length - 1].value
    )
    console.log(currentEx)
}

getExchange()
