const express = require('express')
const { Router } = express
const productsRouter = require('./routers/productsRouter')
const login = require('./routers/login')

const Carrito = require('./carrito')
const app = express()

const cartRouter = Router()


const carrito = new Carrito('carrito.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos', productsRouter) // se creo productRouter.js con toda la logica
app.use('/api/carrito', cartRouter)   
app.use('api', login)
app.use('',express.static(__dirname + 'public'))

let administrador
const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor: ${error}`))


cartRouter.post('', async (req, res)=> {
  const now =  new Date()
  const prod = []
  const cart =  {
    timestamp: now,
    productos : prod
  }

  await carrito.save(cart)

  return res.json(cart.id)
})

cartRouter.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const cart = await carrito.getById(id)
  
  if(cart === undefined){
  return res.status(404).json({error: 'Carrito no encontrado'})
  }
  await carrito.deleteById(id)
  return res.json(carrito)
})

cartRouter.get('/:id/productos', async (req,res) => {
  const id = Number(req.params.id)
  const cart =  await carrito.getById(id)

  
if (cart === undefined){
  return res.status(404).json({error: 'Carrito no encontrado'})
}

  return res.json(cart.productos)
})

cartRouter.post('/:id/productos', async (req, res) => {
  const id = Number(req.params.id)
  const cart = await carrito.getById(id)
  const product = req.body
//encontrar id de carrito y actualizarle los prodcutos
console.log(cart)

  const cartUpdate = {
    "id": cart.id,
    "timestamp": cart.timestamp,
    "productos": product
  }
    carrito.update(cartUpdate)
    
  return res.json(carrito)


 
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  const id = Number(req.params.id)
  const id_prod = Number(req.params.id_prod)
  const cart =  await carrito.getById(id)
  

let nnp = cart.productos.filter(prod => prod.id !== id_prod)

  const newCart = {
    "id": id,
    "timestamp": cart.timestamp,
    "productos":  nnp
  }

  carrito.update(newCart)
  return res.json(newCart)

})