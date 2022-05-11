const db = require('../db/connect')
const translate = require('../src/translate.json')

//take data from db

const takeTopClassFromDB = async () => {
    const getClass = await db.execute('SELECT * FROM ninja_top_class')
    const allClass = getClass[0].map(e => e.class)

    // console.log(allClass)
    return allClass
}

const takeTopSkillFromDB = async () => {
    const getSkill = await db.execute('SELECT * FROM ninja_top_skill')
    const allSkill = getSkill[0].map(e => e.skill)
    // console.log(allSkill)
    return allSkill
}

takeTopClassFromDB()
takeTopSkillFromDB()

const wheel = async () => {
    const topClass = await takeTopClassFromDB()
    const topSkill = await takeTopSkillFromDB()

    let result

    r1 = Math.floor(Math.random() * topClass.length)
    r2 = Math.floor(Math.random() * topSkill.length)

    // console.log(topClass[r1])
    // console.log(topSkill[r2])
    topClass[r1]

    const transClass = translate.top.class[topClass[r1]]
    const transSkill = translate.top.skill[topSkill[r2]]

    result = `${transClass}佐${transSkill}`
    // console.log(result)

    return result
}

// wheel()
module.exports = wheel
