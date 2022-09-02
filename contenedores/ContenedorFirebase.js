const db = require('../firebase/dbf')
//const productModel = require('../models/products')
let query

class ContenedorFirebase {
    constructor (collection) {
        this.collection = collection
       query = db.collection(collection)
    }

    getAll(){
        
        db
        .then(_ => productModel.find({}))
        .then(items =>  {
           console.log(items)
            return items
            })
        .catch(err => console.log(`Error: ${err.message}`))
        
        
    }

    getById(id){

    }

    async save(object){
        try{
            const now = Date.now()
            object.timestamp = now
            const data = await query.add(object)
        } catch (e) {
            console.log(`Error: ${e.message}`)
        }
    }

    update(id, data){
        
    }

    delete(id){

    }
}

module.exports = ContenedorFirebase