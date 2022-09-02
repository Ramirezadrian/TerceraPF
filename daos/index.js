const ProductosDAOArchivo = require("./productos/ProductosDAOArchivo");


const getStorage = () => {
    const storage = process.env.STORAGE
    switch(storage){
        case 'archivo':
            return {
                products: new ProductosDAOArchivo()
            }
        break;
        case 'mongodb':
            return {
                products: new ProductosDAOArchivo() //cambiar
            }
        break;
        default:
            return {
                products: new ProductosDAOArchivo()
            }
    }
}

module.exports = getStorage