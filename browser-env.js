#!/usr/bin/env node

const
  fs = require('fs'),
  { success, error } = require('handy-log'),
  { promisify } = require('util'),
  { coroutine } = require('bluebird'),
  append = promisify(fs.appendFile),
  exists = promisify(fs.exists),
  deleteFile = promisify(fs.unlink)

coroutine(function* (){
  let
    parse = require('dotenv').parse,
    valuesFromFile = parse(fs.readFileSync('./.env')),
    outputFile = './browser-env.js',
    result = [],
    fileExists = yield exists(outputFile)

  if (fileExists) {
    deleteFile(outputFile)
  } else {
    error('.Env file is missing in this directory!!')
    return
  }

  for (const elem in valuesFromFile) {
    result[elem] = valuesFromFile[elem]
  }

  yield append(outputFile, 'module.exports = ')
  yield append(outputFile, JSON.stringify(valuesFromFile, null, 2))

  success('Successfully created a ./browser-env.js file.')

})()

