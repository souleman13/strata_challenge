const uuid = require('uuid').v4;

const mongoCollection = 'transactions'

const newTransaction = async (db, transactionParams) => {
    const newTransaction = { ...transactionParams, transactionId: uuid() }
    const transactionsCollection = db.collection(mongoCollection)
    return await transactionsCollection.insertOne(newTransaction)
        .then(result => {
            return result.ops
        })
        .catch(err => err)
}

const getTransactions = async (db, filters) => {
    const transactionsCollection = db.collection(mongoCollection)
    return await transactionsCollection.find({ ...filters }).toArray()
        .then(result => {
            return {
                filters: filters,
                data: result
            }
        })
        .catch(err => err)
}

module.exports = { newTransaction, getTransactions }