const validateUserService = require('./validateUserService')
// const userDao = require('../database/userDAO')


const service = {}

/**
 * Checks if the entered name contains any characters as < > / \
 * @param {*} name 
 */
service.validateName = (name) => {
    return (/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(name))
}
/**
 * Checks if the descriptions character count is between 1 and 300.
 * Also checks for < > / \ 
 * @param {*} desc 
 */
service.validateDescription = (desc) => {
    if (desc.length > 1 || desc.length < 300) {
        return (/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(desc))
    }
}

/**
 * Validates that the owner is actually present in the database.
 * @param {*} req 
 */
service.validateOwner = (req) => {
   return validateUserService.isAlreadyRegistered(req.owner.email) 
}



module.exports = service