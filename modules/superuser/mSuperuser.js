const db = require('../../config/db').db()

exports.getUsuario = (obj) => {
    return db.query(`
        select * from usuarios
        where Usuario = ? and Contraseña = ?
    `, [ obj.usuario, obj.contraseña ])
}

exports.getInmobiliarias = () => {
	return db.query(`
		select * from inmobiliarias
	`, [])
}

exports.insertInmobiliaria = (obj) => {
	return db.query(`
		insert into inmobiliarias (nombre, direccion, celular, mail)
		values (?, ?, ?, ?)
	`, [ obj.nombre, obj.direccion, obj.celular, obj.email ])
}