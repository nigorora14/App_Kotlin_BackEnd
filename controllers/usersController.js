const User = require('../models/user')
const bcrypt = require('bcryptjs') // para comparar contraseñas
//const passport = require('passport')
const jwt = require('jsonwebtoken') // para el token
const keys = require('../config/keys')
const Rol = require('../models/rol')

module.exports = {
    async getAll(req, res, next){
        try {
            const data = await User.getAll()
            console.log(`Usuarios: ${data}`)
            return res.status(200).json(data)
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false,
                message: `Error al obtener los usuarios`
            })
        }
    },

    async register(req, res, next){
        try {
            const user = req.body // captura lo que el cliente envia mediante parametros
            const data = await User.create(user) //espera la sentencia sql que devolvera el id

            await Rol.create(data.id, 1) // asignar rol por defecto 1-CLIENTE

            //se crea el token
            const token = jwt.sign({ id: data.id, email: data.email}, keys.secretOrKey,{
                // expiresIn:
                })

                const myData = { // myData que se le va retornar al frontend para almacenarlo en el token
                    id: data.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    image: user.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true, 
                    message: 'El registro se realizo Correctamente',
                    data: myData
                })
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false, 
                message: 'El registro NO se realizo',
                error: error
            })
        }
    },

    async login(req, res, next){
        try {
            const email = req.body.email //lo que viene del fronend
            const password = req.body.password //lo que viene del fronend

            const myUser = await User.findByEmail(email) // se obtiene la data de la bd del usuario en json
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El Email no fue encontrado.'
                })
            }
            
            const isPasswordValid = await bcrypt.compare(password, myUser.password) // compara el pass del frontEnd = encrytado
            if (isPasswordValid) {
                //crea el token
                const token = jwt.sign({ id: myUser.id, email: myUser.email}, keys.secretOrKey,{
                // expiresIn:
                })

                const data = { // data que se le va retornar al frontend
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }
                return res.status(200).json({
                    success: true,
                    message:'El usuario ha sido autenticado',
                    data: data
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta'
                })
            }

        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false, 
                message: 'No se pudo Logear.',
                error: error
            })
        }
    }

}