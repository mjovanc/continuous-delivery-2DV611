const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 3
})

// From https://dev.to/probablyrealrob/getting-started-with-mariadb-using-docker-and-node-js-3djg
module.exports = {
  getConnection: function () {
    return new Promise(function (resolve, reject) {
      pool.getConnection().then(function (connection) {
        resolve(connection)
      }).catch(function (error) {
        reject(error)
      })
    })
  },
  getMockConnection: function () {
    const Mockgoose = require('mockgoose').Mockgoose
    const mockgoose = new Mockgoose(mariadb)
    
    return new Promise((resolve, reject) => {
      mockgoose.prepareStorage().then(() => {
        pool.getConnection().then(function (connection) {
          resolve(connection)
        }).catch(function (error) {
          reject(error)
        })
      })
    })
  }
}
