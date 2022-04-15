const https = require('https')
const express = require('express')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//route
app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.post('/webhook', (req, res) => {
    res.send('HTTP POST request sent to the webhook URL!')
    //If the user sends a message to your bot, send a reply message
    if (req.body.enents[0].type === 'message') {
        //Message data, must be stringified
        const dataString = JSON.stringify({
            replyToken: req.body.enents[0].replyToken,
            messages: [
                {
                    type: 'text',
                    text: 'Hello, user',
                },
                {
                    type: 'text',
                    text: 'May I help you?',
                },
            ],
        })

        //Request header
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + TOKEN,
        }

        //Options to pass into the request
        const webhookOptions = {
            hostname: 'api.line.me',
            path: '/v2/bot/message/reply',
            method: 'POST',
            headers: headers,
            body: dataString,
        }
    }
})

const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

app.listen(PORT, () => {
    console.log(`poe-bot listening at http://localhost:${PORT}`)
})
