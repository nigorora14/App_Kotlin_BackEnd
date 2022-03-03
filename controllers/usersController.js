const User = require('../models/user')

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
            const data = await User.create(user) //espera la sentencia sql

            return res.status(201).json({
                success: true, 
                message: 'El registro se realizo Correctamente',
                data: data.id
            })
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false, 
                message: 'El registro NO se realizo',
                error: error
            })
        }
    }

}