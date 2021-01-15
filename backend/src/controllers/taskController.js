const service = require('../services/taskService')
const { successMessages } = require('../models/message')

const controller = {}

controller.getTasks = async (req, res, next) => {
  try {
  const { userId } = req.params
  const tasks = await service.getTasks(userId)
  res.json(tasks)
  } catch (error) {
    return next(error)
  }
}

controller.create = async (req, res, next) => {
  try {
    service.createTask(req.body)
    res.status(200).json({ success: true, message: successMessages.TASKCREATED })
  } catch (error) {
    return next(error)
  }
}

controller.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    service.deleteTask(id)
    res.status(200).json({ success: true, message: successMessages.TASKDELETED })
  } catch (error) {
    return next(error)
  }
}

module.exports = controller
