const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

class ProductosDAOFirebase extends ContenedorFirebase {
    constructor() {
        super('products')
    }
}

module.exports = ProductosDAOFirebase