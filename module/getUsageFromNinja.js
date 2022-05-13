const translateList = require('../src/itemTranslate.json')
const puppeteer = require('puppeteer')
const redis = require('redis')
const logger = require('../src/logger')

const client = redis.createClient()
client.on('', () => {})
client.connect()

// const translated = 'The Anima Stone'
// console.log(translated)

const getItemUsage = async translated => {
    let searchResult = await client.get(`${translated}`)

    if (!searchResult) {
        const usage = await searchItem(translated)
        await client.setEx(translated, 3600, usage)

        searchResult = await client.get(`${translated}`)
    }

    return searchResult
}

const searchItem = async translated => {
    const browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.goto(`https://poe.ninja/challenge/builds`, {
        waitUntil: 'networkidle2',
    })

    await page.waitForTimeout(2500)

    await page.type(`#openSidebar > div > section:nth-child(1) > header > div > input`, `${translated}`)

    // const getItem = await page.evaluate(() => {
    //     return [
    //         document.querySelector('#openSidebar > div > section:nth-child(2) > div > div > div > ul > li > div'),
    //     ].map(e => e.textContent)
    // })

    const getItem = await page.$$eval(
        '#openSidebar > div > section:nth-child(2) > div > div > div > ul > li > div',
        el => el.map(item => item.textContent)
    )

    const usage = getItem[0].match(/\d+/g).join('.')
    // console.log(getItem)
    // console.log(usage)

    return usage
    //store to db try redis
}

// searchItem(commandParam)

// getItemUsage(translated)

module.exports = getItemUsage
