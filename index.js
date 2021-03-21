const fs = require('fs')

let myArgs = process.argv.slice(2)
console.log('myArgs: ', myArgs)


switch (myArgs[0]) {
  case 'didit':
    let now = new Date()
    let fp = './times'
    console.log(`You did it at ${now}`)
    fs.readFile(fp, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`This is the data:\n ${data}`)
      if (data === '') {
        console.log(`This is the first time you've done it!`)
      }
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
