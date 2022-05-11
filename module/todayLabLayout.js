const puppeteer = require('puppeteer')
const addUberLabImageToDB = require('./dbutil/forDBquery').addUberLabImageToDB

let getToDayUberLab = async () => {
    const browser = await puppeteer.launch({
        //headless: false
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.goto(`https://www.poelab.com/`, {
        waitUntil: 'domcontentloaded',
    })

    await page.click('#custom_html-84 > div > div > center > div > div:nth-child(1) > div > h2 > a')

    await page.waitForTimeout(1000)
    const imageLink = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
            .map(img => img.currentSrc)
            .filter(imgtext => imgtext.includes('uber'))[0]
    })

    const timeStamp = new Date().getTime()
    const currentDate = new Date(timeStamp).toLocaleDateString('zh-TW')

    addUberLabImageToDB(currentDate, imageLink)

    console.log(currentDate)
    console.log(imageLink)

    await browser.close()
    // return imageLink
}

getToDayUberLab()
// module.exports = getToDayUberLab
