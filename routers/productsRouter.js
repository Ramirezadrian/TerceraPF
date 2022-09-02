const express = require('express')
const { Router } = express
const storage = require('../daos')


const ProductosDAOArchivo = require('../daos/productos/ProductosDAOArchivo')
const ProductosDAOMongoDB = require('../daos/productos/ProductosDAOMongoDB')
const ProductosDAOFirebase = require('../daos/productos/ProductosDAOFirebase')



const productsRouter = Router()

//const productosDAO = new ProductosDAOArchivo()
const productosDAO = new ProductosDAOMongoDB()
//const productosDAO = new ProductosDAOFirebase()
productsRouter.use(express.json())
productsRouter(express.urlencoded({ extended: true }))
productsRouter.get('', async (req,res) =>{

      products = await productosDAO.getAll()
     
     //aca me llega undefined
     console.log(products)
     return res.json(products)
     
     
  })

  productsRouter.get('/:id', async (req,res) =>{
    const id = Number(req.params.id)
    const product = await productosDAO.getById(id)
   
  if (product === undefined){
    return res.status(404).json({error: 'Producto no encontrado'})
  }
    return res.json(product)
  })
  


  productsRouter.post('', async (req, res) => {
    const data = req.body

   const newProduct = await productosDAO.save(data)
   return res.status(201).json(newProduct)
  })
  


  productsRouter.put('/:id', async (req, res)=>{
  
    const id = (Number(req.params.id))
    const products = await productosDAO.getAll()
    const productIndex = products.findIndex(product=> product.id === id)
  
    if(productIndex === -1){
    return res.status(404).json({error : 'Producto no encontrado'})
    }
    const body = req.body
  
    
    products[productIndex].name = body.name
    products[productIndex].description = body.description
    products[productIndex].code = body.code
    products[productIndex].price = body.price
    products[productIndex].thumbnail = body.thumbnail  
    products[productIndex].stock = body.stock
  
   // products[productIndex] = body
   
    //cree esta funcion en contenedor.js para actualizar y no perder los id
    await productosDAO.update(products[productIndex])
      
    return res.json(products)
  })
  
  productsRouter.delete('/:id', async (req,res)=>{
    const id = Number(req.params.id)
    const product = await productosDAO.getById(id)
    console.log(product)
    if(product === undefined){
    return res.status(404).json({error: 'Producto no encontrado'})
    }
    await productosDAO.deleteById(id)
    return res.json(product)
  })

  module.exports = productsRouter