const service = require('../services/userService')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { successMessages, errorMessages } = require('../models/message')

const controller = {}

controller.create = async (req, res, next) => {
  try {
    await service.createUser(req.body)
    res.status(200).json({ success: true, message: successMessages.USERCREATED })
  } catch (error) {
    return next(error)
  }
}

controller.update = async (req, res, next) => {
  try {
    await service.updateUser(req.body)
    res.status(200).json({
      success: true,
      message: successMessages.USERUPDATED
    })
  } catch (error) {
    return next(error)
  }
}

controller.login = async (req, res, next) => {
  const secret = 'blablabla'
  const timeToExpire = '2h'

  try {
    const user = await service.login(req.body)
    console.log(user)
    if (user) {
      const { id, email, name } = user

      const token = jwt.sign({ email: email }, secret, { expiresIn: timeToExpire })
      res.status(200).json({
        id: id,
        email: email,
        name: name,
        token: token,
        message: successMessages.USERFOUND
      })
    } else {
      console.log('error')
      throw createError(400, errorMessages.NOUSERFOUND)
    }
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
