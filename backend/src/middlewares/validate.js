const createError = require('http-errors')
const service = require('../services/validateUserService')
const errorMessages = require('../models/message')

const validate = {}

validate.user = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name && !email && !password) {
    const error = createError(400, errorMessages.MISSINGPARAMETERS)
    return next(error)
  }

  const isValidPassword = service.isValidPassword(password)
  const isValidName = service.isValidName(name)
  const isValidEmail = service.isValidEmail(email)
  const isAlreadyRegistered = service.isAlreadyRegistered(email)

  if (!isValidPassword) {
    const error = createError(400, errorMessages.TOOSHORTPASSWORD)
    next(error)
  } else if (!isValidName) {
    const error = createError(400, errorMessages.TOOSHORTNAME)
    next(error)
  } else if (!isValidEmail) {
    const error = createError(400, errorMessages.INVALIDEMAIL)
    next(error)
  } else if (await isAlreadyRegistered) {
    const error = createError(400, errorMessages.ALREADYREGISTERED)
    next(error)
  }

  next()
}

module.exports = validate
