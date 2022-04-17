const https = require('https')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN
const fetch = require('node-fetch')
const getData = require('./controller/getChar')
const getItem = require('./controller/getItem')

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

        const dataString = await getItem(req, res, accountName, charName)
        console.log(dataString)

        // Request header
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + TOKEN,
        }

        // Options to pass into the request
        const webhookOptions = {
            hostname: 'api.line.me',
            path: '/v2/bot/message/reply',
            method: 'POST',
            headers: headers,
            body: dataString,
        }

        // Define request
        const request = https.request(webhookOptions, res => {
            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        // Handle error
        request.on('error', err => {
            console.error(err)
        })

        // Send data
        request.write(dataString)
        request.end()
    } else if (req.body.events[0].type === 'message') {
        const accountName = req.body.events[0].message.text

        const dataString = await getData(req, res, accountName)
        console.log(dataString)

        // Request header
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + TOKEN,
        }

        // Options to pass into the request
        const webhookOptions = {
            hostname: 'api.line.me',
            path: '/v2/bot/message/reply',
            method: 'POST',
            headers: headers,
            body: dataString,
        }

        // Define request
        const request = https.request(webhookOptions, res => {
            res.on('data', d => {
                process.stdout.write(d)
            })
        })

        // Handle error
        request.on('error', err => {
            console.error(err)
        })

        // Send data
        request.write(dataString)
        request.end()
    }
})

app.listen(PORT, () => {
    console.log(`poe-bot listening at http://localhost:${PORT}`)
})
