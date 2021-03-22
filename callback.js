const fs = require('fs')

let myArgs = process.argv.slice(2)
console.log('myArgs: ', myArgs)

switch (myArgs[0]) {
  case 'didit':
    let now = new Date()
    let fp = './times'
    console.log(`You did it at ${now}`)
    fs.readFile(fp, 'utf8', (err, data) => {
      // Everything under this only executes after readFile is finished
      if (err) {
        console.error(err)
        return
      }
      // If this is the first time then the textfile is empty
      if (data === '') {
        console.log(`This is the first time you've done it!`)
      } else {
        let times = data.trim().split('\n')
        let lastTime = times[times.length - 1]
        console.log(`The last time you did it was at: ${lastTime}`)
      }
      // We dont want to write to the file while we're reading it 
      // We call appendFile in the callback of readFile
      fs.appendFile(fp, now.toString() + '\n', err => {
        if(err) {
          console.error(err)
          return
        }
      })
    })
    break
  default:
    console.log('Sorry, try another input')
}
