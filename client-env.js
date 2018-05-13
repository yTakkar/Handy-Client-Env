#!/usr/bin/env node

const
  fs = require('fs'),
  { success, error } = require('handy-log'),
  { config } = require('dotenv'),
  outputFile = './env.js'

const {
  error: e, parsed
} = config()

if (e) {
  error(e)

} else {

  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile)
  }

  fs.appendFileSync(
    outputFile,
    `module.exports = ${JSON.stringify(parsed, null, 2)}`
  )

  success(`Successfully created a ${outputFile} file.`)
}

