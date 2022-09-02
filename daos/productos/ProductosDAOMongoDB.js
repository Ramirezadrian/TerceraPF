const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");

class ProductosDAOMongoDB extends ContenedorMongoDB {
    constructor() {
        super('products')
    }
}

module.exports = ProductosDAOMongoDB