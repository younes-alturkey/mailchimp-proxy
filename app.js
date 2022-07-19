require("dotenv").config()
const Mailchimp = require("mailchimp-api-v3")
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const app = express()
const { PORT, MAIL_CHIMP_API_KEY } = process.env
const appPort = PORT || 5000

const mailchimp = new Mailchimp(MAIL_CHIMP_API_KEY)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post("/subscribe/:email", (req, res) => {
  const { params } = req
  const { email } = params

  mailchimp
    .post("/lists/8b7ac87426/members", {
      email_address: email,
      status: "subscribed",
    })
    .then(function (results) {
      res.send(results)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
})

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}\n`)
})
