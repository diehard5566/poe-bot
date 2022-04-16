const https = require('https')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN
const fetch = require('node-fetch')

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
    if (req.body.events[0].type === 'message') {
        const accountName = req.body.events[0].message.text
        const getCharacter_url = `https://www.pathofexile.com/character-window/get-characters?accountName=${accountName}`

        let res
        let data
        let dataString
        try {
            res = await fetch(getCharacter_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'User-Agent': 'OAuth poe-bot/1.0.0 (contact: shihyao001@gmail.com)', // 👈
                },
            })
            data = await res.json()

            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                    {
                        type: 'text',
                        text: '你好啊,流亡者',
                    },
                    {
                        type: 'text',
                        text: `帳號:${accountName},目前總共有${data.length}隻角色！`,
                    },
                ],
            })

            if (data.error) {
                throw new Error('error')
            }
        } catch (error) {
            // Message data, must be stringified
            dataString = JSON.stringify({
                replyToken: req.body.events[0].replyToken,
                messages: [
                    {
                        type: 'text',
                        text: '你好啊,流亡者',
                    },
                    {
                        type: 'text',
                        text: `痾....帳號:${accountName}不存在！！！`,
                    },
                ],
            })
        }

        // console.log(dataString)

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
