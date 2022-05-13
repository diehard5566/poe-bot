const weapons = require('../src/ninjaItemOverView/weapons.json')
const armours = require('../src/ninjaItemOverView/armours.json')
const flasks = require('../src/ninjaItemOverView/flasks.json')
const jewels = require('../src/ninjaItemOverView/jewels.json')
const accessories = require('../src/ninjaItemOverView/accessories.json')

// const translated = 'yeet' //'Mageblood'
// const translated = "Emperor's Mastery"

const getItemPrice = async translated => {
    const findAccessoryPrice = accessories.lines.filter(e => e.name === translated)
    const findWeaponPrice = weapons.lines.filter(e => e.name === translated)
    const findArmourPrice = armours.lines.filter(e => e.name === translated)
    const findFlaskPrice = flasks.lines.filter(e => e.name === translated)
    const findJewelPrice = jewels.lines.filter(e => e.name === translated)

    if (findAccessoryPrice.length != 0) {
        return { price: findAccessoryPrice[0].exaltedValue, icon: findAccessoryPrice[0].icon }
    } else if (findWeaponPrice.length != 0) {
        return { price: findWeaponPrice[0].exaltedValue, icon: findWeaponPrice[0].icon }
    } else if (findArmourPrice.length != 0) {
        return { price: findArmourPrice[0].exaltedValue, icon: findArmourPrice[0].icon }
    } else if (findFlaskPrice.length != 0) {
        return { price: findFlaskPrice[0].exaltedValue, icon: findFlaskPrice[0].icon }
    } else if (findJewelPrice.length != 0) {
        return { price: findJewelPrice[0].exaltedValue, icon: findJewelPrice[0].icon }
    }
}

// console.log(getItemPrice(translated))
module.exports = getItemPrice
