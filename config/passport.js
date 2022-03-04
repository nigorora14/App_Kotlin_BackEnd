const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')// con esto usa el metodo para obtener el usuario
const Keys = require('./keys') // llama la llave que se obtuvo de https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx

module.exports = function(passport){

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = Keys.secretOrKey
    
    passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, user) => { //obtiene un usuario por id
            if (err) {
                return done(err, false)
            } 
            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        })
    }))
}