const db = require('../../config/db').db()

exports.getUserInmobiliaria = (usuario, contraseña) => {
    return db.query(`
    	SELECT * FROM inmobiliarias
    	WHERE usuario = ? AND clave = ?
    `, [ usuario, contraseña ])
}

exports.getAll = () => {
    return db.query(`
        select * from inmobiliarias order by nombre
    `, [])
}

exports.getById = (id) => {
    return db.query(`
        select * from inmobiliarias where id = ?
    `, [ id ])
}