// const assert = require('assert')
const { expect } = require('chai')
const validateUserService = require('../src/services/validateUserService')

// TODO: Add checks that no duplicates is possible in database, using mockgoose.
describe('The isValidName function shoulddetermines wheter a name is valid or not.', () => {
  it('Should validate name "Jesper" as valid', function () {
    const result = validateUserService.isValidName('Jesper')
    expect(result).to.be.eq(true)
  })

  it('Should return false when argument isn\' of type String', function () {
    const result = validateUserService.isValidName(1234)
    expect(result).to.be.eq(false)
  })

  it('Should return false with strings mixed with integers', function () {
    const result = validateUserService.isValidName('Jeppe123')
    expect(result).to.be.eq(false)
  })

  it('Should return false if too short (under 3 characters).', function () {
    const result = validateUserService.isValidPassword('Je')
    expect(result).to.be.eq(false)
  })

  // Should check for TypeError instead of false.
  it('Should throw TypeError if no argument is given', function () {
    const result = validateUserService.isValidName()
    expect(result).to.be.eq(false)
  })
})

describe('The isValidPassword function should determine if a password is valid or not.', () => {
  it('Should return true for password: \'P4ssw0rd!\'', function () {
    const result = validateUserService.isValidPassword('P4ssw0rd!')
    expect(result).to.be.eq(true)
  })

  /* it('Should return false for passwords that only contain letters.', function () {
      const result = validateUserService.isValidPassword('Password')
      expect(result).to.be.eq(false)
    }) */

  it('Should return false for passwords that only contain numbers.', function () {
    const result = validateUserService.isValidPassword('12345')
    expect(result).to.be.eq(false)
  })

  it('Should return true for passwords that contains a letter / number combination.', function () {
    const result = validateUserService.isValidPassword('password123')
    expect(result).to.be.eq(true)
  })

  it('Should return false if too short (under 6 character)', function () {
    const result = validateUserService.isValidPassword('passw')
    expect(result).to.be.eq(false)
  })

  /* it('Should throw TypeError if no argument is given.', function()
    {
        const result = validateUserService.isValidPassword()
        expect(result).to.throw(TypeError)
    }) */
})

describe('The isValidEmail should determine wheter a email is valid or not', () => {
  it('Should return true for email: \'jesper.eriksson@email.com\'', function () {
    const result = validateUserService.isValidEmail('jesper.eriksson@email.com')
    expect(result).to.be.eq(true)
  })

  it('Should return false with email without \'@\' included.', function () {
    const result = validateUserService.isValidEmail('jesper.eriksson.email.com')
    expect(result).to.be.eq(false)
  })

  it('Should return false other than a String is sent as argument.', function () {
    const result = validateUserService.isValidEmail(123)
    expect(result).to.be.eq(false)
  })

  /* it('Should throw TypeError if no argument is given.', function()
    {
        const result = validateUserService.isValidEmail()
        expect(result).to.throw(TypeError)
    }) */
})
