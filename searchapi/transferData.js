const getItemFromGGG = require('../controller/getItem')
const storeItem = getItemFromGGG[1]
const { exMods, imMods } = require('../searchapi/filterMod')
let tradeAPIStats = require('../src/tradeAPI-stats.json')

// const items = [
//     {
//         verified: false,
//         w: 2,
//         h: 3,
//         icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9Eb21lT2ZCcmFzcyIsInciOjIsImgiOjMsInNjYWxlIjoxfV0/41f06694f2/DomeOfBrass.png',
//         league: 'Archnemesis',
//         id: '2c70730cd5fb101f8f6e26f9fd6577255bf6b5d56185ee198208d7f6e70da079',
//         sockets: [],
//         name: 'The Brass Dome',
//         typeLine: 'Gladiator Plate',
//         baseType: 'Gladiator Plate',
//         identified: true,
//         ilvl: 83,
//         corrupted: true,
//         properties: [],
//         requirements: [],
//         implicitMods: ['+2 to Level of Socketed AoE Gems', '+2 to Level of Socketed Trap or Mine Gems'],
//         explicitMods: [
//             '354% increased Armour',
//             '+5% to all maximum Elemental Resistances',
//             'Strength provides no bonus to Maximum Life',
//             'Take no Extra Damage from Critical Strikes',
//         ],
//         flavourText: ["The turtle's shell one day becomes its tomb."],
//         frameType: 3,
//         x: 0,
//         y: 0,
//         inventoryId: 'BodyArmour',
//         socketedItems: [],
//     },
//     {
//         verified: false,
//         w: 2,
//         h: 3,
//         icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvV2VhcG9ucy9PbmVIYW5kV2VhcG9ucy9TY2VwdGVycy9IZWlzdFNjZXB0cmVFbGVtZW50YWwiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MX1d/34e5d78ab3/HeistSceptreElemental.png',
//         league: 'Archnemesis',
//         id: '9a5b0f43c44077a80ab4b5117ec844e3d76d3a3909937e017668f1ea21bcc8d3',
//         influences: {
//             redeemer: true,
//         },
//         sockets: [
//             {
//                 group: 0,
//                 attr: 'G',
//                 sColour: 'W',
//             },
//             {
//                 group: 0,
//                 attr: 'G',
//                 sColour: 'W',
//             },
//             {
//                 group: 0,
//                 attr: 'I',
//                 sColour: 'B',
//             },
//         ],
//         name: 'Agony Gnarl',
//         typeLine: 'Alternating Sceptre',
//         baseType: 'Alternating Sceptre',
//         identified: true,
//         ilvl: 85,
//         split: true,
//         properties: [],
//         requirements: [],
//         enchantMods: [
//             'Quality does not increase Physical Damage',
//             'Grants 1% increased Elemental Damage per 2% Quality',
//         ],
//         implicitMods: ['Secrets of Suffering'],
//         explicitMods: [
//             '79% increased Spell Damage',
//             '+38% to Global Critical Strike Multiplier',
//             '19% increased Mana Regeneration Rate',
//             '+1 to Level of all Spell Skill Gems',
//             '+1 to Level of all Physical Spell Skill Gems',
//             'Hatred has 40% increased Aura Effect',
//         ],
//         craftedMods: ['15% increased Trap Throwing Speed'],
//         frameType: 2,
//         x: 0,
//         y: 0,
//         inventoryId: 'Offhand',
//         socketedItems: [],
//     },
// ]
// storeItem.get('itemFromCharData'). 最後放到items前面

const tranferData = storeItem => {
    let itemWithNeeded = storeItem
        .get('itemFromCharData')
        .items.filter(e => {
            if (e.name != '') {
                return e.name
            }
        })
        .map(el => ({
            // sockets: el.sockets.filter(e => e.group === 0).length,
            // implicitMods: el.implicitMods,
            explicitMods: el.explicitMods,
            // influences: el.influences,
            // baseType: el.properties.filter(e => e[0].name),
        }))

    // console.log('itemWithNeeded: ', itemWithNeeded)
    //把需要convert的地方抽出來
    const explicitMods = itemWithNeeded.filter(el => el.explicitMods != undefined)
    // const implicitMods = itemWithNeeded.map(el => el.implicitMods)
    // console.log(explicitMods)

    //把stats對照表抽出來
    const objExplicit = tradeAPIStats.result.filter(e => e.label === 'Explicit')
    // const objImplicit = tradeAPIStats.result.filter(e => e.label === 'Implicit')

    //進行對照
    const eachItemExplicit = exMods(explicitMods, objExplicit)
    // const eachItemImplicit = imMods(implicitMods, objImplicit)
    // console.log('我是對照後的：', eachItemExplicit)

    //把結果放回原本的表內
    itemWithNeeded
        .filter(el => el.explicitMods != undefined)
        .map(
            (el, index) => (el.explicitMods = eachItemExplicit[index].flat()) //&& (el.implicitMods = eachItemImplicit[index].flat()
        )
    // console.log('convertExplicit: ', itemWithNeeded)
    return itemWithNeeded

    // let explicitModsWithId = []
    // for (let i = 0; i < explicitMods.length; i++) {
    //     let eachItemId = []
    //     for (let j = 0; j < explicitMods[i].length; j++) {
    //         let eachMods = explicitMods[i][j].replace(/\d+|\+/g, '#')

    //         if (eachMods.lastIndexOf('#') != eachMods.indexOf('#')) {
    //             eachMods = eachMods.slice(1)
    //         }

    //         eachItemId['id'] = objExplicit[0].entries.filter(el => el.text === eachMods).map(x => x.id)
    // eachItemId.push(objExplicit[0].entries.filter(el => el.text === eachMods).map(x => x.id))
    //     }
    //     explicitModsWithId.push(eachItemId)
    // }
    // console.log('explicitModsWithId:', explicitModsWithId)
}

module.exports = tranferData

// tranferData()
