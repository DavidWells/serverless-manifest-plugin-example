const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const { promisify, inspect } = require('util')

module.exports = async function processManifest(manifestData) {
  const url = manifestData.dev.urls.byFunction.hello.url
  const myEnvFile = path.resolve('../frontend/.env')
  console.log(`Inject my url ${url} to REACT_APP_MY_API_URL`)
  await updateDotEnv(myEnvFile, {
    REACT_APP_MY_API_URL: url
  })
  console.log('Frontend URL synced!')
}

/* Utils, typically this would be a package includes from NPM */
async function updateDotEnv(filePath, env) {
  // Merge with existing values
  try {
    const existing = dotenv.parse(await promisify(fs.readFile)(filePath, 'utf-8'))
    env = Object.assign(existing, env)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  const contents = Object.keys(env).map(key => format(key, env[key])).join('\n')
  await promisify(fs.writeFile)(filePath, contents)

  return env
}

function escapeNewlines (str) {
  return str.replace(/\n/g, '\\n')
}

function format (key, value) {
  return `${key}=${escapeNewlines(value)}`
}