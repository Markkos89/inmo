const db = require('../../config/db').db()

exports.getUsuario = (obj) => {
    return db.query(`
        select * from usuarios
        where Usuario = ? and Clave = ?
    `, [ obj.usuario, obj.clave ])
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
	`, [ obj.nombre, obj.direccion, obj.celular, obj.email, obj.usuario, obj.clave ])
	// , usuario, clave
	// , ?, ?
}

exports.updateInmobiliaria = (obj) => {
	return db.query(`
		update inmobiliarias set nombre = ?, direccion = ?, celular = ?, mail = ?
		where id = ?
	`, [ obj.nombre, obj.direccion, obj.celular, obj.email, obj.id ])
	// usuario = ?, clave = ?
	// obj.usuario, obj.clave,
}

exports.getInmobiliariaById = (id) => {
	return db.query(`
		select * from inmobiliarias where id = ?
	`, [ id ])
}

exports.getPostsByInmobiliaria = (id) => {
	return db.query(`
		select * from posts where id_inmobiliaria_fk = ?
	`, [ id ])
}

exports.deleteInmobiliaria = (id) => {
	return db.query(`
		delete from inmobiliarias where id = ?
	`, [ id ])
}