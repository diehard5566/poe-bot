const exMods = (explicitMods, obj) => {
    let explicitModsWithId = []
    for (let i = 0; i < explicitMods.length; i++) {
        let eachItemId = []
        for (let j = 0; j < explicitMods[i].length; j++) {
            let eachMods = explicitMods[i][j].replace(/\d+|\+/g, '#')

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

// exMods()
