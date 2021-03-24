const { uuid } = require('uuidv4');

const mongoCollection = 'transactions'

const newTransaction = async (transactionParams) => {
    const newTransaction = { ...transactionParams, transactionId: uuid() }
    return await transactionsCollection.insertOne(newTransaction)
        .then(result => {
            return result.ops
        })
        .catch(err)
}

const getTransactions = async (filters, db) => {
    const transactionsCollection = db.collection(mongoCollection)
    return await transactionsCollection.find({ ...filters }).toArray()
        .then(result => {
            return {
                filters: filters,
                data: result
            }
        })
        .catch(err)
}

module.exports = { newTransaction, getTransactions }