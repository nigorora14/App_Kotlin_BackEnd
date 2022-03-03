const express = require('express')                              //necesario para crear una conexion
const app = express()                                           //necesario para crear una conexion
const http = require('http')                                    //necesario para crear una conexion
const server = http.createServer(app)                           //necesario para crear una conexion

const logger = require('morgan')
const cors = require('cors')
const users = require('./routes/usersRoutes') //importando el js donde estan las rutas de las apis

const port = process.env.PORT || 3000                           //necesario para crear una conexion
app.use(logger('dev'))                      //para debugear los posibles errores
app.use(express.json())                   //para parsear la respuesta que resivamos en formato json
app.use(express.urlencoded({              //para parsear la respuesta que resivamos en formato json
    extended: true                        //para parsear la respuesta que resivamos en formato json
}))                                       //para parsear la respuesta que resivamos en formato json
app.use(cors())
app.disable('x-powered-by')         //para la seguridad

users(app) //llamando a las rutas.......................................

app.set('port',port)                                            //necesario para crear una conexion

server.listen(3000,'192.168.3.105' || 'localhost', function(){  //necesario para crear una conexion
    console.log('backend iniciando con el process :'+ process.pid+' y con el port '+ port)   //necesario para crear una conexion
})                                                              //necesario para crear una conexion

app.get('/', (req, res) => {            //para ver en postman la pagina
    res.send('Ruta raiz del backend')   //para ver en postman la pagina
})

//Error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
})

module.exports = {
    app: app,
    server: server
}