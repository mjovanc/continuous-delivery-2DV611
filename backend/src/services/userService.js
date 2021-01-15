const User = require('../models/user')
const userDAO = require('../database/userDAO')

const service = {}

/**
 * Creates a new user
 *
 * @param {object} req
 */
service.createUser = async (req) => {
  const newUser = new User(
    req.email, req.password, req.name
  )

  await userDAO.createUser(newUser)
}

/**
 * Creates a new user
 *
 * @param {object} req
 */
service.updateUser = async (req) => {
  const updatedUser = new User(
    req.oldEmail, req.newEmail, req.newName
  )

  await userDAO.updateUser(updatedUser)
}


/**
 * Logs in a user
 *
 * @param {object} req
 */
service.login = async (req) => {
  console.log(req)
  return userDAO.login(req)
}

module.exports = service
