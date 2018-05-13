const fs = require('fs')
const { join } = require('path')
const { isEqual } = require('lodash')

describe('Sweet tests', () => {

  it('Should create env.js with given values', () => {

    let values = `username="takkar"
password="iamaverydifficultpassword"
    `

    fs.appendFileSync('./.env', values)   // create .env with above values
    require('./client-env')               // let client-env do something nice :)

    let inputValues = {                   // values to be compared
      username: 'takkar',
      password: 'iamaverydifficultpassword'
    }
    let outputValues = require('./env.js')    // require values from env.js

    expect(
      isEqual(inputValues, outputValues)
    ).toBe(true)

    // Finally when the test is complete, delete .env & env.js
    fs.unlinkSync(join(__dirname, '.env'))
    fs.unlinkSync(join(__dirname, 'env.js'))
  })

})
