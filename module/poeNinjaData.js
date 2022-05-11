const puppeteer = require('puppeteer')
const db = require('../db/connect')

const scrapeNinja = async () => {
    const browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.goto(`https://poe.ninja/challenge/builds?time-machine=day-6`, {
        waitUntil: 'domcontentloaded',
    })

    await page.waitForTimeout(4000)

    const getSkill = await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll(
                '#openSidebar > div > section:nth-child(3) > div > div > div > ul li .css-1h2ruwl'
            )
        ).map(e => e.textContent)
    })

    const getClass = await page.evaluate(() => {
        return [...document.querySelectorAll('#main > div > div.css-cznuct > div.css-gdhgww > div > div > div')].map(
            e => e.textContent
        )
    })

    console.log(getSkill)
    console.log(getClass)

    let allClass = []
    for (let i = 0; i < getClass.length; i++) {
        allClass.push(getClass[i].split(/\d+/g)[0])
    }

    const topFive = allClass.slice(0, 10)
    for (let i = 0; i < topFive.length; i++) {
        topFive[i]
        db.execute(`
          INSERT INTO ninja_top_class (id, class) VALUES('${i + 1}','${topFive[i]}')
        `)
    }

    for (let i = 0; i < getSkill.length; i++) {
        getSkill[i]
        db.execute(`
          INSERT INTO ninja_top_skill (id,skill) VALUES('${i + 1}','${getSkill[i]}')
        `)
    }
}

scrapeNinja()
