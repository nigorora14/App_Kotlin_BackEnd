const express = require('express') //necesario para crear una conexion
const app = express()//necesario para crear una conexion
const http = require('http')//necesario para crear una conexion
const server = http.createServer(app)//necesario para crear una conexion

const logger = require('morgan')
const cors = require('cors')

const port = process.env.PORT || 3000//necesario para crear una conexion
app.set('port',port)//necesario para crear una conexion

server.listen(3000,'192.168.3.105' || 'localhost', function(){//necesario para crear una conexion
    console.log('backend iniciando con el process :'+ process.pid+' y con el port '+port)//necesario para crear una conexion
})//necesario para crear una conexion