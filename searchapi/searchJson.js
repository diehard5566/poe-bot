const itemDataTransfered = require('./transferData')
const convertedItemData = itemDataTransfered()

const storeForEachItem = new Map()

const getItemForSearch = reqBody
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
        filters: {
            trade_filters: {
                filters: {
                    sale_type: {
                        option: 'priced',
                    },
                    price: {
                        min: 1,
                        max: 999,
                    },
                    collapse: {},
                },
            },
            misc_filters: {
                filters: {},
            },
            type_filters: {
                filters: {},
            },
            map_filters: {
                filters: {},
            },
        },
    },
    sort: {
        price: 'asc',
    },
}

// console.log(convertedItemData)

for (let i = 0; i < convertedItemData.length; i++) {
    console.log('-------diff item------')

    const eachItem = convertedItemData[i]
    // console.log(eachItem)
    storeForEachItem.set(`item-No${i}`, eachItem)
    console.log(storeForEachItem)
}

for (let j = 0; j < storeForEachItem.get(`item-No${i}`); j++) {
    const element = array[j]
}

// for (const i in convertedItemData) {
// let filter = {}
// console.log(`each item ${i}:`, eachItem.implicitMods.concat(eachItem.explicitMods))

// let eachItemMods = eachItem.implicitMods.concat(eachItem.explicitMods)
// console.log(`eachItemMods ${i}: `, eachItemMods)
// for (let j = 0; j < eachItemMods.length; j++) {
//     searchJson_Def.query.stats[0].filters.push({
//         id: eachItemMods[j],
//         disable: false,
//         value: { min: 1 },
//     })
// }
//

// let filter = {} //id: convertedItemData[i].implicitMods[i], disable: false, value: { min: 1 }
// filter['id'] = convertedItemData.implicitMods
// filter['disable'] = false
// filter['value'] = { min: 1 }

// let setSearchJson
// }

// console.log(searchJson_Def.query)
//
