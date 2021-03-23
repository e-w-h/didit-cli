const fs = require('fs')

let myArgs = process.argv.slice(2)
console.log('myArgs: ', myArgs)

switch (myArgs[0]) {
  case 'didit':
    let now = new Date()
    let fp = './times'
    console.log(`You did it at ${now}`)
    readAndAppend(fp, 'utf8', now.toString() + '\n')
    break
  default:
    console.log('Sorry, try another input')
}

async function readAndAppend(fp, encoding, timestamp) {
  try {
    let data = await rfPromise(fp, encoding)
    if (data === '') {
      console.log(`This is the first time you've done it!`)
      return await afPromise(fp, timestamp)
    } else {
      let times = data.trim().split('\n')
      let lastTime = times[times.length - 1]
      console.log(`The last time you did it was at: ${lastTime}`)
      return await afPromise(fp, timestamp)
    }
  } catch (error) {
    console.error(error)
  }
}

// Wrap async functions in Promise constructors
function rfPromise(fp, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(fp, encoding, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

function afPromise(fp, timestampString) {
  return new Promise((_, reject) => {
    fs.appendFile(fp, timestampString, err => {
      if (err) {
        return reject(err)
      }
      // 1a. 'err' only callback leaves us with nothing to resolve
    })
  })
}