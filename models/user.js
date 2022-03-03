const db = require('../config/config') //para la conexion

const User = {}

User.getAll = () => {
    const sql = `SELECT * FROM users`
    return db.manyOrNone(sql)
}

User.create = (user) => {
    const sql = `INSERT INTO USERS (EMAIL, NAME, LASTNAME, PHONE, IMAGE,PASSWORD, CREATE_AT,UPDATE_AT)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ID`

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()
    ])
}

module.exports = User
