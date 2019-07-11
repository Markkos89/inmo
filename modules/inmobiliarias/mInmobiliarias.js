const db = require('../../config/db').db()

exports.getUserInmobiliaria = (usuario, contraseña) => {
    return db.query(`
    	SELECT * FROM inmobiliarias
    	WHERE usuario = ? AND clave = ?
    `, [ usuario, contraseña ])
}