const userDAO = require('../database/userDAO')

const service = {}

/**
 * Checks if name is long enough
 *
 * @param {string} name
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidName = (name) => {
  try {
    if (typeof name !== 'string') return false
    // Right now regex doesn't allow whitespaces in a name.
    if (/^(([A-Za-z]+[ \-' ]?)*([A-Za-z]+)?)+([A-Za-z]+[ \-' ]?)*([A-Za-z]+)?$/.test(name) === false) return false
    if (!(name.length >= 3)) return false
    if (!(name.length <= 40)) return false
    return true
  } catch (err) {
    throw new TypeError('No argument found in isValidName()')
  }
}

/**
 * Checks if password is long enough
 *
 * @param {*} pwd
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidPassword = (pwd) => pwd.length >= 6

/**
 * Uses a regex to check if the email is valid.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if valid / False if not valid.
 */
service.isValidEmail = (email) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

/**
 * Checks if the provided email address is already in use.
 *
 * @param {string} email - Email address.
 * @returns {boolean} - True if already in use/False if not
 */
service.isAlreadyRegistered = async (email) => {
  const user = await userDAO.findByEmail(email)
  if (user) {
    return true
  } else {
    return false
  }
}

module.exports = service
