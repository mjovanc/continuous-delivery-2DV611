const Task = require('../models/task')
const taskDAO = require('../database/taskDAO')

const service = {}

service.getTasks = async (userId) => {
  return taskDAO.getTasks(userId)
}

/**
 * Creates a task
 *
 * @param {object} req
 */
service.createTask = (req) => {
  const task = service.parseTaskFromRequest(req)
  console.log(task)
  return taskDAO.createTask(task)
}

/**
 * Deletes a task
 *
 * @param {number} id The id of the task we want to delete
 */
service.deleteTask = (id) => {
  return taskDAO.deleteTask(id)
}

/**
 * Parses and returns a Task from the request
 *
 * @param {object} req
 */
service.parseTaskFromRequest = (req) => {
  return new Task(
    null, // Id will be null until inserted into database
    req.name,
    req.description,
    req.owner,
    null // Date will be created inside the model?
  )
}

module.exports = service
