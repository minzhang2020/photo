const log4js = require('log4js')
log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'logs/photo.log', maxLogSize: 10485760, backups: 30 }
  },
  categories: {
    default: { appenders: ['everything'], level: 'debug' }
  }
})

function getLogger(name) {
  return log4js.getLogger(name)
}

module.exports = getLogger
