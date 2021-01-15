const express = require('express')
const cors = require('cors')
const headers = require('./headers')
const helmet = require('helmet')
const createError = require('http-errors')

const app = express()

// Middlewares
app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(headers)

// To get access to req.body

// Root routes
app.use('/api/user', require('./routes/userRouter'))
app.use('/api/task', require('./routes/taskRouter'))
// Fall back to 404
app.use('*', (req, res, next) => next(createError(404)))

// Error Handling
app.use((err, req, res) => {
  let responseError = err
  if (!createError.isHttpError(err)) {
    console.error(err)
    responseError = createError(500)
  }
  res.status(responseError.status).send({ message: `${responseError.message}` })
})

const port = process.env.PORT || 5001
app.listen(port, () => console.log(`Listening on port ${port}...`))
