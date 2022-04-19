const https = require('https')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN
const getChar = require('./controller/getChar')
const getItem = require('./controller/getItem')
const reSponse = require('./controller/response')

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/webhook', async (req, res) => {
    res.send('HTTP POST request sent to the webhook URL!')
    // If the user sends a message to your bot, send a reply message
    if (req.body.events[0].type === 'message' && req.body.events[0].message.text.includes('/')) {
        const accountName = req.body.events[0].message.text.split('/')[0]
        const charName = req.body.events[0].message.text.split('/')[1]

        const token = process.env.LINE_ACCESS_TOKEN

        const dataString = await getItem(req, res, accountName, charName)
        console.log(dataString)

        reSponse(dataString, token)
    } else if (req.body.events[0].type === 'message') {
        const accountName = req.body.events[0].message.text

        const dataString = await getChar(req, res, accountName)
        console.log(dataString)

        //send request
        reSponse(dataString, token)
    }
})

app.listen(PORT, () => {
    console.log(`poe-bot listening at http://localhost:${PORT}`)
})
