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
		insert into inmobiliarias (nombre, direccion, celular, mail, usuario, clave)
		values (?, ?, ?, ?, ?, ?)
	`, [ obj.nombre, obj.direccion, obj.celular, obj.email, obj.usuario, obj.clave ])
}

exports.updateInmobiliaria = (obj) => {
	return db.query(`
		update inmobiliarias set nombre = ?, direccion = ?, celular = ?, mail = ?, usuario = ?, clave = ?
		where id = ?
	`, [ obj.nombre, obj.direccion, obj.celular, obj.email, obj.usuario, obj.clave, obj.id ])
}

exports.getInmobiliariaById = (id) => {
	return db.query(`
		select * from inmobiliarias where id = ?
	`, [ id ])
}

exports.deleteInmobiliaria = (id) => {
	return db.query(`
		delete from inmobiliarias where id = ?
	`, [ id ])
}