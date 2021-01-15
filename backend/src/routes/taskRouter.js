const router = require('express').Router()
const controller = require('../controllers/taskController')
const authorize = require('../middlewares/authorize')

// Task
router.get('/:userId', authorize.ownerOfTask, controller.getTasks)
router.post('/', authorize.ownerOfTask, controller.create)
router.delete('/:id', controller.delete)

module.exports = router
