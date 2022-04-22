const getItemFromGGG = require('../controller/getItem')
const storeItem = getItemFromGGG[1]
const fs = require('fs')
let tradeAPIStats

const items = [
    {
        verified: false,
        w: 2,
        h: 3,
        icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvQXJtb3Vycy9Cb2R5QXJtb3Vycy9Eb21lT2ZCcmFzcyIsInciOjIsImgiOjMsInNjYWxlIjoxfV0/41f06694f2/DomeOfBrass.png',
        league: 'Archnemesis',
        id: '2c70730cd5fb101f8f6e26f9fd6577255bf6b5d56185ee198208d7f6e70da079',
        sockets: [],
        name: 'The Brass Dome',
        typeLine: 'Gladiator Plate',
        baseType: 'Gladiator Plate',
        identified: true,
        ilvl: 83,
        corrupted: true,
        properties: [],
        requirements: [],
        implicitMods: ['+2 to Level of Socketed AoE Gems', '+2 to Level of Socketed Trap or Mine Gems'],
        explicitMods: [
            '354% increased Armour',
            '+5% to all maximum Elemental Resistances',
            'Strength provides no bonus to Maximum Life',
            'Take no Extra Damage from Critical Strikes',
        ],
        flavourText: ["The turtle's shell one day becomes its tomb."],
        frameType: 3,
        x: 0,
        y: 0,
        inventoryId: 'BodyArmour',
        socketedItems: [],
    },
    {
        verified: false,
        w: 2,
        h: 3,
        icon: 'https://web.poecdn.com/gen/image/WzI1LDE0LHsiZiI6IjJESXRlbXMvV2VhcG9ucy9PbmVIYW5kV2VhcG9ucy9TY2VwdGVycy9IZWlzdFNjZXB0cmVFbGVtZW50YWwiLCJ3IjoyLCJoIjozLCJzY2FsZSI6MX1d/34e5d78ab3/HeistSceptreElemental.png',
        league: 'Archnemesis',
        id: '9a5b0f43c44077a80ab4b5117ec844e3d76d3a3909937e017668f1ea21bcc8d3',
        influences: {
            redeemer: true,
        },
        sockets: [
            {
                group: 0,
                attr: 'G',
                sColour: 'W',
            },
            {
                group: 0,
                attr: 'G',
                sColour: 'W',
            },
            {
                group: 0,
                attr: 'I',
                sColour: 'B',
            },
        ],
        name: 'Agony Gnarl',
        typeLine: 'Alternating Sceptre',
        baseType: 'Alternating Sceptre',
        identified: true,
        ilvl: 85,
        split: true,
        properties: [],
        requirements: [],
        enchantMods: [
            'Quality does not increase Physical Damage',
            'Grants 1% increased Elemental Damage per 2% Quality',
        ],
        implicitMods: ['Secrets of Suffering'],
        explicitMods: [
            '79% increased Spell Damage',
            '+38% to Global Critical Strike Multiplier',
            '19% increased Mana Regeneration Rate',
            '+1 to Level of all Spell Skill Gems',
            '+1 to Level of all Physical Spell Skill Gems',
            'Hatred has 40% increased Aura Effect',
        ],
        craftedMods: ['15% increased Trap Throwing Speed'],
        frameType: 2,
        x: 0,
        y: 0,
        inventoryId: 'Offhand',
        socketedItems: [],
    },
]
// storeItem.get('itemFromCharData'). 最後放到items前面
const tranferData = () => {
    const notEmptyName = items
        .filter(e => {
            if (e.name != '') {
                return e.name
            }
        })
        .map(el => el.explicitMods)

    console.log(notEmptyName) //.flat(Infinity)

    fs.readFile('../src/tradeAPI-stats.json', 'utf-8', function (err, data) {
        if (err) throw err
        tradeAPIStats = JSON.parse(data)
        let obj = tradeAPIStats.result.filter(e => e.label === 'Explicit') //&& e.entries.find(el=>el.text ===)

        console.log(obj[0])

        for (let i = 0; i < notEmptyName.length; i++) {
            console.log('---------------diff item---------------')
            for (let j = 0; j < notEmptyName[i].length; j++) {
                console.log('==========')
                let percent = notEmptyName[i][j].indexOf('%')
                // console.log(percent)
                let eachMods = notEmptyName[i][j]
                console.log('eachMods: ', eachMods) //.slice(space)

                let modSrc = obj[0].entries.some(el => el.text === eachMods)
                console.log('Here is modSrc: ', modSrc)
            }
        }
    })
}

// module.exports= tranferData notEmptyName[i][j] ===

tranferData()
