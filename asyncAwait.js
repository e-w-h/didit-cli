const fs = require('fs').promises

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
  let data = await fs.readFile(fp, encoding)
  if (data === '') {
    console.log(`This is the first time you've done it!`)
    return await fs.appendFile(fp, timestamp)
  } else {
    let times = data.trim().split('\n')
    let lastTime = times[times.length - 1]
    return await fs.appendFile(fp, timestamp)
  }
}
