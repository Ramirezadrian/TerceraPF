const { Schema, model } = require('mongoose')

const productSchema = new Schema({
 name: { type: String, required: true, max: 100 },
 description: { type: String, required: true, max: 100 },
 code: { type: Number, required: true, max: 20},
 price: { type: Number, required: true, max: 999999},
 thumbnail: { type: String, required: true, max: 500 },
 stock: { type: Number, required: true, max: 999999},
 timestamp: { type: Number, required: true}
})

module.exports = model('Product', productSchema)