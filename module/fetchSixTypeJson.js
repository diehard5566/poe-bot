//fetch every 15 minutes
const fetch = require('node-fetch')
const fs = require('fs')

const fetchNinjaData = async () => {
    //every 15 minute fetch ninja weapon/armours//accessories/flask/jewel
    let searchType = 'UniqueAccessory'

    const ninjaAPI = `https://poe.ninja/api/data/ItemOverview?league=Sentinel&language=en&type=`
    const ninjaOption = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }
    const resAccessories = await fetch(ninjaAPI + 'UniqueAccessory', ninjaOption)
    const resJewels = await fetch(ninjaAPI + 'UniqueJewel', ninjaOption)
    const resFlasks = await fetch(ninjaAPI + 'UniqueFlask', ninjaOption)
    const resWeapons = await fetch(ninjaAPI + 'UniqueWeapon', ninjaOption)
    const resArmours = await fetch(ninjaAPI + 'UniqueArmour', ninjaOption)

    const jsonAccessories = await resAccessories.json()
    const jsonJewels = await resJewels.json()
    const jsonFlasks = await resFlasks.json()
    const jsonWeapons = await resWeapons.json()
    const jsonArmours = await resArmours.json()
    fs.writeFile('../src/ninjaItemOverView/accessories.json', JSON.stringify(jsonAccessories), 'utf8', function (err) {
        if (err) throw err
        else console.log('done')
    })
    fs.writeFile('../src/ninjaItemOverView/jewels.json', JSON.stringify(jsonJewels), 'utf8', function (err) {
        if (err) throw err
        else console.log('done')
    })
    fs.writeFile('../src/ninjaItemOverView/flasks.json', JSON.stringify(jsonFlasks), 'utf8', function (err) {
        if (err) throw err
        else console.log('done')
    })
    fs.writeFile('../src/ninjaItemOverView/weapons.json', JSON.stringify(jsonWeapons), 'utf8', function (err) {
        if (err) throw err
        else console.log('done')
    })
    fs.writeFile('../src/ninjaItemOverView/armours.json', JSON.stringify(jsonArmours), 'utf8', function (err) {
        if (err) throw err
        else console.log('done')
    })
}

fetchNinjaData()
