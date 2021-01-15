const router = require('express').Router()
const controller = require('../controllers/userController')
const validate = require('../middlewares/validate')

// User
router.post('/register', validate.user, controller.create)
router.post('/update', controller.update)
router.post('/login', controller.login)

module.exports = router
