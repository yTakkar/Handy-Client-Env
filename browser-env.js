#!/usr/bin/env node

const
  fs = require('fs'),
  { success, error } = require('handy-log'),
  parse = require('dotenv').parse,
  srcFile = './.env',
  outputFile = './browser-env.js'

if (!fs.existsSync(srcFile)) {
  error('.Env file is missing!!')
  return
}

let
  valuesFromFile = parse(fs.readFileSync(srcFile)),
  result = [],
  fileExists = fs.existsSync(outputFile)

if (fileExists) {
  fs.unlinkSync(outputFile)
}

for (let elem in valuesFromFile) {
  result[elem] = valuesFromFile[elem]
}

fs.appendFileSync(outputFile, `module.exports = ${JSON.stringify(valuesFromFile, null, 2)}`)

success(`Successfully created a ${outputFile} file.`)
