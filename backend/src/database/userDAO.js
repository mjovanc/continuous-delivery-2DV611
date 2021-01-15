const pool = require('./databaseConnection')
const bcrypt = require('bcryptjs')
const createError = require('http-errors')
const errorMessages = require('../models/message')

const userDAO = {}

/**
 * Registers a new user
 *
 * @param {user} user
 */
userDAO.createUser = async (user) => {
  let conn
  try {
    conn = await pool.getConnection()
    // conn = await pool.getMockConnection()

    const insertNewUserQuery = 'INSERT INTO user (email, password, name) VALUES (?, ?, ?)'
    const { email, password, name } = user

    const hashedPassword = await bcrypt.hash(password, 8)

    await conn.query(insertNewUserQuery, [email, hashedPassword, name])
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Registers a new user
 *
 * @param {user} user
 */
userDAO.updateUser = async (user) => {
  let conn
  try {
    conn = await pool.getConnection()
    // conn = await pool.getMockConnection()
    const { oldEmail, newEmail, newName } = user
    const updateUserQuery = `UPDATE user SET email=${newEmail}, name=${newName} WHERE email=${oldEmail}`

    await conn.query(updateUserQuery)
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Logs in a user
 *
 * @param {*} userToLogIn
 */
userDAO.login = async (userToLogIn) => {
  console.log(userToLogIn)
  let conn
  try {
    conn = await pool.getConnection()

    const user = await userDAO.findByEmail(userToLogIn.email)
  
    if (user) {
      const userFound = await bcrypt.compare(userToLogIn.password, user.password)
      if (userFound) {
        return user
      }
    } else {
      throw createError(400, errorMessages.NOUSERFOUND)
    }
  } finally {
    if (conn) conn.release()
  }
}

/**
 * Finds a user by email
 *
 * @param {string} email
 * @returns {object} user
 */
userDAO.findByEmail = async (email) => {
  let conn
  try {
    conn = await pool.getConnection()
    // conn = await pool.getMockConnection()

    const selectUserByEmail = 'SELECT * FROM user WHERE email=?'

    const [user] = await conn.query(selectUserByEmail, [email])

    return user
  } finally {
    if (conn) conn.release()
  }
}

module.exports = userDAO
