#!/usr/bin/env node

const
  fs = require('fs'),
  { success, error } = require('handy-log'),
  { promisify } = require('util'),
  { coroutine } = require('bluebird'),
  srcFile = './.env',
  outputFile = './browser-env.js',
  append = promisify(fs.appendFile),
  exists = promisify(fs.exists),
  deleteFile = promisify(fs.unlink)

if (!fs.existsSync(srcFile)) {
  error('.Env file is missing!!')
  return
}

coroutine(function* (){
  let
    parse = require('dotenv').parse,
    valuesFromFile = parse(fs.readFileSync(srcFile)),
    result = [],
    fileExists = yield exists(outputFile)

  if (fileExists) {
    deleteFile(outputFile)
  }

  for (const elem in valuesFromFile) {
    result[elem] = valuesFromFile[elem]
  }

  yield append(outputFile, `module.exports = ${JSON.stringify(valuesFromFile, null, 2)}`)

  success(`Successfully created a ${outputFile} file.`)

})()

