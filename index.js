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
        return afPromise(fp, now.toString() + '\n')
      } else {
        let times = data.trim().split('\n')
        let lastTime = times[times.length - 1]
        console.log(`The last time you did it was at: ${lastTime}`)
        return afPromise(fp, now.toString() + '\n')
      }
    }).then().catch(err => {
      console.error(err)
    })
    break
  default:
    console.log('Sorry, try another input')
}

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
  return new Promise((resolve, reject) => {
    fs.appendFile(fp, timestampString, err => {
      if (err) {
        return reject(err)
      }
    })
  })
}

// fs.readFile(fp, 'utf8', (err, data) => {
//   // Everything under this only executes after readFile is finished
//   if (err) {
//     console.error(err)
//     return
//   }
//   // If this is the first time then the textfile is empty
//   if (data === '') {
//     console.log(`This is the first time you've done it!`)
//   } else {
//     let times = data.trim().split('\n')
//     let lastTime = times[times.length - 1]
//     console.log(`The last time you did it was at: ${lastTime}`)
//   }
//   // We dont want to write to the file while we're reading it 
//   // We call appendFile in the callback of readFile
//   fs.appendFile(fp, now.toString() + '\n', err => {
//     if(err) {
//       console.error(err)
//       return
//     }
//   })
// })