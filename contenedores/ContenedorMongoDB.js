const db = require('../config')
const productModel = require('../models/products')

class ContenedorMongoDB {
    constructor (collection) {
        this.collection = collection
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

    save(object){
        const now = Date.now()
        object.timestamp = now
        const data = new productModel(object)
        db
        .then(_ => data.save())
        .catch(err => console.log(`Error: ${err.message}`))
        
    }

    update(id, data){
        
    }

    delete(id){

    }
}

module.exports = ContenedorMongoDB