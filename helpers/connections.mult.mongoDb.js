const mongoose = require('mongoose');

function newConnection(uri) {
 const conn = mongoose.createConnection(uri,  {
  useNewUriParser: true,
  userUnifiedtopoloy: true
 })

 conn.on('connected', function() {
  console.log(`Mongodb::: connected:::${this.name}`)
 })

 conn.on('disconnected,', function() {
  console.log(`MongoDb::: disconnected:::${this.name}`)
 })

 conn.on('error', function(error) {
  console.log(`MongoDB:: connection  ${this.name} ${JSON.stringify(error)}`)
 })

 return conn
}

const testConnection = newConnection(process.env.MONGO_URI_TEST)
const userConnection = newConnection(process.env.MONGO_URI_USER)

module.exports = {
   testConnection,
   userConnection
}