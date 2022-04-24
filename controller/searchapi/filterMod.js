// const explicitMods = [
//     {
//         explicitMods: [
//             'Socketed Gems are Supported by Level 20 Vile Toxins',
//             'Adds 13 to 24 Chaos Damage',
//             '+55 to maximum Life',
//             '+28% to Chaos Resistance',
//             '21% increased Poison Duration',
//         ],
//     },
//     {
//         explicitMods: [
//             '+500 to Accuracy Rating',
//             '54% increased Armour and Evasion',
//             '30% increased Rarity of Items found',
//             '+30% to Lightning Resistance',
//             '0.4% of Attack Damage Leeched as Mana',
//             '10% increased Movement Speed',
//         ],
//     },
//     {
//         explicitMods: [
//             '+26 to Intelligence',
//             'Adds 5 to 12 Cold Damage to Attacks',
//             '13% increased Global Accuracy Rating',
//             '+43 to maximum Life',
//             '+18% to Lightning Resistance',
//             '10% increased Light Radius',
//         ],
//     },
//     {
//         explicitMods: [
//             '11% increased Attack Speed',
//             '+132 to Evasion Rating',
//             '+36 to maximum Life',
//             '+38% to Cold Resistance',
//             '+41% to Lightning Resistance',
//         ],
//     },
//     {
//         explicitMods: [
//             '18% reduced Attribute Requirements',
//             '+26 to Dexterity',
//             '+17% to Lightning Resistance',
//             '25% increased Movement Speed',
//         ],
//     },
//     {
//         explicitMods: [
//             '+8 to Intelligence',
//             '+31 to maximum Energy Shield',
//             '+30% to Fire Resistance',
//             '+31% to Cold Resistance',
//         ],
//     },
//     {
//         explicitMods: [
//             '+21 to all Attributes',
//             '6% increased Quantity of Items found',
//             '+20% to Fire Resistance',
//             '20% increased Flask Effect Duration',
//             '-2 Physical Damage taken from Attack Hits',
//         ],
//     },
//     {
//         explicitMods: [
//             '+19 to Strength',
//             '4% increased Spell Damage',
//             'Adds 4 to 7 Cold Damage to Attacks',
//             '17% increased Global Critical Strike Chance',
//             '+8 to maximum Energy Shield',
//             '+2 Mana gained on Kill',
//         ],
//     },
// ]

// let tradeAPIStats = require('../src/tradeAPI-stats.json')
// let obj = tradeAPIStats.result.filter(e => e.label === 'Explicit')

const exMods = (explicitMods, obj) => {
    let explicitModsWithId = []
    for (let i = 0; i < explicitMods.length; i++) {
        let eachItemId = []
        // console.log('inside first loop', explicitMods[i])

        for (let j = 0; j < explicitMods[i].explicitMods.length; j++) {
            // console.log('inside second loop', explicitMods[i].explicitMods[j])
            let eachMods = explicitMods[i].explicitMods[j].replace(/\d+|\+/g, '#') // ^[+-]?\d+/

            // console.log(eachMods)

            if (eachMods.lastIndexOf('#') != eachMods.indexOf('#')) {
                eachMods = eachMods.slice(1)
            }
            eachItemId.push(obj[0].entries.filter(el => el.text === eachMods).map(x => x.id))
        }
        explicitModsWithId.push(eachItemId)
    }
    // console.log('explicitModsWithId:', explicitModsWithId)
    return explicitModsWithId
}

// const imMods = (implicitMods, obj) => {
//     let implicitModsWithId = []
//     for (let i = 0; i < implicitMods.length; i++) {
//         let eachItemId = []
//         for (let j = 0; j < implicitMods[i].length; j++) {
//             let eachMods = implicitMods[i][j].replace(/\d+|\+/g, '#')

//             if (eachMods.lastIndexOf('#') != eachMods.indexOf('#')) {
//                 eachMods = eachMods.slice(1)
//             }
//             eachItemId.push(obj[0].entries.filter(el => el.text === eachMods).map(x => x.id))
//         }
//         implicitModsWithId.push(eachItemId)
//     }
//     // console.log('explicitModsWithId:',implicitModsWithId)
//     return implicitModsWithId
// }

//影響價格不大，這邊還搞不定先跳過

// const enMods = (enchantMods, obj) => {
//     if (typeof enchantMods === undefined) {
//         return undefined
//     } else {
//         let enchantModsWithId = []
//         for (let i = 0; i < enchantMods.length; i++) {
//             let eachItemId = []
//             for (let j = 0; j < enchantMods[i].length; j++) {
//                 let eachMods = enchantMods[i][j].replace(/\d+|\+/g, '#')

//                 if (eachMods.lastIndexOf('#') != eachMods.indexOf('#')) {
//                     eachMods = eachMods.slice(1)
//                 }
//                 eachItemId.push(obj[0].entries.filter(el => el.text === eachMods).map(x => x.id))
//             }
//             enchantModsWithId.push(eachItemId)
//         }

//         return enchantModsWithId
//     }
// }

// const craftMods=

module.exports = {
    exMods,
    // imMods,
}

// exMods(explicitMods, obj)
