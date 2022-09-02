const admin = require('firebase-admin')
const {readFile} = require('fs/promises')

/* 
const serviceAccount = JSON.parse(
    await readFile(
      new URL('./key.json', import.meta.url)
    )
  )

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: 'https://js-pfinal-ebae8.firebaseio.com'
})

//ESTO MUESTRA EN CONSOLA

//await readFile(
// ^^^^^
// SyntaxError: missing ) after argument list


const db = admin.firestore()

module.exports = db
//const query = db.collection('users')
//export default query
  */