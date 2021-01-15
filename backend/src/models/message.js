const errorMessages = {
  // User validation
  TOOSHORTPASSWORD: 'Password needs to be at least 6 characters long!',
  TOOSHORTNAME: 'Name needs to be at least 3 characters long!',
  INVALIDEMAIL: 'Not a valid email address!',
  ALREADYREGISTERED: 'Email already exists',
  MISSINGPARAMETERS: 'No parameters entered!',
  // User
  NOUSERFOUND: 'User does not exist!'
}

const successMessages = {
  // User
  USERUPDATED: 'User succesfully updated!',
  USERCREATED: 'User created!',
  USERFOUND: 'User found!',
  TASKCREATED: 'Task successfully created.',
  TASKDELETED: 'Task successfully deleted.'
}

module.exports = { errorMessages, successMessages }
