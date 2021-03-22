const fs = require('fs')

let myArgs = process.argv.slice(2)
console.log('myArgs: ', myArgs)

switch (myArgs[0]) {
  case 'didit':
    let now = new Date()
    let fp = './times'
    console.log(`You did it at ${now}`)
    rfPromise(fp, 'utf8').then(data => {
      if (data === '') {
        console.log(`This is the first time you've done it!`)
        /* Not really passing anything within this scope to next Promise
        TODO: Find more applicable and or interesting things to do */
        return afPromise(fp, now.toString() + '\n')
      } else {
        let times = data.trim().split('\n')
        let lastTime = times[times.length - 1]
        console.log(`The last time you did it was at: ${lastTime}`)
        return afPromise(fp, now.toString() + '\n')
      }
    }).then().catch(err => {  // 1b. With nothing to resolve then is called with no args
      console.error(err)
    })
    break
  default:
    console.log('Sorry, try another input')
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
