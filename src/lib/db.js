/**
 *  Database component
 *  append your config in this component
 *  config stored in /src/config/config.js
 */

import mongoose from 'mongoose'
import {
  dbHost,
  dbName,
  dbPass,
  dbPort,
  dbUser,
  dbAuthType
} from '../config/config'

mongoose.Promise = Promise
mongoose.set('debug', true)

let connectionString = `mongodb://${dbHost}:${dbPort}/${dbName}`

if (dbAuthType !== 'none') {
  connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

const connection = mongoose.connect(connectionString, { useNewUrlParser: true })

export default {
  db: {
    connection
  }
}
