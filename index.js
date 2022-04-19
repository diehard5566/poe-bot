const https = require('https')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const replyMsg = require('./controller/replyMsg')

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
    replyMsg(req.body, res)
})

app.listen(PORT, () => {
    console.log(`poe-bot listening at http://localhost:${PORT}`)
})
