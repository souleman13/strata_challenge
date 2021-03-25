const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

const transactionService = require('./src/transactions')
const numberService = require('./src/numbers')
const errorHandler = require('./src/error')

//Server Config
const app = express();

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

//non-DB endpoints
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/test', async (req, res) => {
    const result = await numberService.toArabicNumeral(req.body.startVal)
        .catch(err => errorHandler(err, res))
    res.status(200).send({ result })
})

//DB Config
const mongoUser = 'Doug'
const mongoPW = 'hdHHh7heXBAaZMc6'
const mongoDatabase = 'strata_challenge'
const mongoConnnectionString = `mongodb+srv://${mongoUser}:${mongoPW}@cluster0.otl8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
MongoClient(
    mongoConnnectionString, //conection string
    { useUnifiedTopology: true }) //mongo client options
    .connect((err, client) => {
        if (err) return console.error(err)
        console.log('Connected to MongoDB')
        const db = client.db(mongoDatabase)

        //DB Endpoints

        //Transaction Endpoints
        //get all transactions from db
        app.post('/transactions', async (req, res) => {
            const filters = req.body
            const result = await transactionService.getTransactions(db, filters)
            if (result.err) errorHandler.basicError(result.err, res)
            res.send({ result })
        })

        //code challenge endpoints
        app.post('/toArabicNumeral', async (req, res) => {
            console.log(req.body)
            const result = await numberService.toArabicNumeral(req.body.startVal)
            console.log(result)
            if (result.err) {
                await transactionService.newTransaction(db, {
                    operation: 'toArabicNumeral',
                    startVal: req.body.startVal,
                    endVal: result,
                    success: false,
                    error: result.err
                })
                await errorHandler.basicError('toArabicNumeral', transaction.err, res, db)
            }

            //record successful transaction
            await transactionService.newTransaction(db, {
                operation: 'toArabicNumeral',
                startVal: req.body.startVal,
                endVal: result,
                success: true
            })

            await res.json({ result })
        })

        app.post('/toRomanNumeral', async (req, res) => {
            const result = await numberService.toRomanNumeral(req.body.startVal)
            if (result.err) {
                await transactionService.newTransaction(db, {
                    operation: 'toArabicNumeral',
                    startVal: req.body.startVal,
                    endVal: result,
                    success: false,
                    error: result.err
                })
                await errorHandler.basicError('toRomanNumeral', result.err, res, db)
            }
            await transactionService.newTransaction(db, {
                operation: "toRomanNumeral",
                startVal: req.body.startVal,
                endVal: result,
                success: true
            })
            res.send({ result })
        })

        //start server
        app.listen(4000, () =>
            console.log('Example app listening on port 4000!'),
        );
    })