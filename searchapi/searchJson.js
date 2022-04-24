//im a function
const fetch = require('node-fetch')

// const singleItem = {
//     explicitMods: [
//         'explicit.stat_1379411836',
//         'explicit.stat_809229260',
//         'explicit.stat_2126027382',
//         'explicit.stat_3294232483',
//     ],
//     influences: undefined,
//     inventoryId: 'Ring',
// }

const getItemForSearch = async singleItem => {
    const searchJson_Def = {
        query: {
            status: {
                option: 'online',
            },
            stats: [
                {
                    filters: [],
                    type: 'and',
                },
            ],
            // filters: {
            //     trade_filters: {
            //         filters: {
            //             category: {
            //                 option: 'default',
            //             },
            //         },
            //     },
            // },
        },
        sort: {
            price: 'asc',
        },
    }
    try {
        const exp = await singleItem.explicitMods

        for (let i = 0; i < exp.length; i++) {
            searchJson_Def.query.stats[0].filters.push({
                id: exp[i],
                disable: false,
                value: { min: 1 },
            })
        }
    } catch (error) {
        console.log(error)
    }

    // if (singleItem.inventoryId === 'Ring' || singleItem.inventoryId === 'Ring2') {
    //     searchJson_Def.query.filters.trade_filters.filters.category.option = 'accessory.ring'
    // }

    // switch (singleItem.inventoryId) {
    //     case 'Ring':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'accessory.ring'
    //         break
    //     case 'Ring2':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'accessory.ring'
    //         break
    //     case 'Amulet':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'accessory.amulet'
    //         break
    //     case 'Belt':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'accessory.belt'
    //         break
    //     case 'BodyArmour':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.chest'
    //         break
    //     case 'Boots':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.boots'
    //         break
    //     case 'Bow':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.bow'
    //         break
    //     case 'Claw':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.claw'
    //         break
    //     case 'Dagger':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.dagger'
    //         break
    //     case 'FishingRod':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.rod'
    //         break
    //     case 'Gloves':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.gloves'
    //         break
    //     case 'Helm':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.helmet'
    //         break
    //     case 'OneHandedAxe':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.oneaxe'
    //         break
    //     case 'OneHandedMace':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.onemace'
    //         break
    //     case 'OneHandedSword':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.onesword'
    //         break
    //     case 'Quiver':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.quiver'
    //         break
    //     case 'RuneDagger':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.runedagger'
    //         break
    //     case 'Sceptre':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.sceptre'
    //         break
    //     case 'Shield':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'armour.shield'
    //         break
    //     case 'Staff':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.staff'
    //         break
    //     case 'TwoHandedAxe':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.twoaxe'
    //         break
    //     case 'TwoHandedSword':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.twosword'
    //         break
    //     case 'Wand':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.wand'
    //         break
    //     case 'Warstaff':
    //         searchJson_Def.query.filters.trade_filters.filters.category.option = 'weapon.warstaff'
    //         break
    //     default:
    //         searchJson_Def.query.filters.trade_filters.filters.category = {}

    //         break
    // }

    return searchJson_Def
}

module.exports = getItemForSearch

// getItemForSearch(singleItem)
