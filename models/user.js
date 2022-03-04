const db = require('../config/config') //para la conexion
const bcryptjs = require('bcryptjs')

const User = {}

User.getAll = () => {
    const sql = `SELECT * FROM users`
    return db.manyOrNone(sql)
}

User.create = async (user) => {
    const hash = await bcryptjs.hash(user.password, 10)//para encrytar

    const sql = `INSERT INTO USERS (EMAIL, NAME, LASTNAME, PHONE, IMAGE,PASSWORD, CREATE_AT,UPDATE_AT)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ID`

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        hash,//para encrytar
        new Date(),
        new Date()
    ])
}

User.findByEmail = (email) => {
    const sql = `
    SELECT id,email,name,lastname,image,phone,password,session_token 
      FROM users
     where email = $1`

     //retornara el usuario para logearnos con jwt
     return db.oneOrNone(sql, email)
}

User.findById = (id, callback) => {
    const sql = `
    SELECT id,email,name,lastname,image,phone,password,session_token 
      FROM users
     where id = $1`

     //retornara el usuario para logearnos con jwt
     return db.oneOrNone(sql, id).then(user => {
         callback(null, user)
     })
}

module.exports = User
