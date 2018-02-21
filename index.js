const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const router = express.Router()

// =======================
// configuration =========
// =======================
// Routes
const filterRoute = require('./server/filter/filter.route')

// Initialize router
filterRoute(router)

const port = process.env.PORT || 9000 // used to create, sign, and verify tokens

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))

// Allow cross origin requests
app.use(cors())

// use morgan to log requests to the console
app.use(morgan('dev'))
app.use('/api/v1/', router)

app.use('/', express.static(__dirname + '/public', { redirect: false }))

// =======================
// Server ================
// =======================
// Start Server
const server = app.get('*', function (req, res) {
  res.sendFile(process.cwd() + '/public/index.html')
}).listen(port)

console.log('Fam, go to http://localhost:' + port)

module.exports = app
