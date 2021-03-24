const transactionService = require('./transactions')

const basicError = async (err, res) => {
    res.status(400)
    res.send({error: err})
}

module.exports = { basicError }