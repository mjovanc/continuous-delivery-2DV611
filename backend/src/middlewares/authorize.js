const jwt = require('jsonwebtoken')
// const createError = require('http-errors')

const authorize = {}

authorize.ownerOfTask = async (req, res, next) => {
  /* NOT WORKING
  try {
    const token = await req.headers.authorization
    const emailFromCookie = await req.body.owner
    const emailFromToken = jwt.verify(token, 'blablabla').email

    if (emailFromCookie !== emailFromToken) {
      const error = createError(403, 'You are not autorized to create an log in this owners name')
      return next(error)
    }
  } catch (error) {
    const err = createError(401, error.name)
    return next(err)
  }

  next()
  */
  // Below code checks that token is valid...
  try {
  const token = await req.headers.authorization
  jwt.verify(token, 'blablabla')
  next()
  } catch (error) {
    return next(error)
  }
}

module.exports = authorize
