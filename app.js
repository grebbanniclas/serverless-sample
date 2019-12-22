const express = require('express')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()

const version = 1;

router.use(cors())
router.use(awsServerlessExpressMiddleware.eventContext())


router.get('/', (req, res) => {
  res.json({ route: 'index', version, query: req.query })
})

router.get('/other', (req, res) => {
    res.json({ route: 'other', version, query: req.query })
});

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app