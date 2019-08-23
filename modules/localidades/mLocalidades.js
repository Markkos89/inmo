const db = require('../../config/db').db()

exports.getLocalidades = () => {
	return db.query(`
		select * from localidades
	`, [])
}

exports.getById = (id) => {
	return db.query(`
		select * from localidades where id = ?
	`, [ id ])
}

exports.insertLocalidad = (obj) => {
	return db.query(`
		insert into localidades (nombre) values (?)
	`, [obj.nombre])
}

exports.updateLocalidad = (obj) => {
	return db.query(`
		update localidades set nombre = ? where id = ?
	`, [ obj.nombre, obj.idLocalidad ])
}

exports.getPostsByLocalidad = (id) => {
	return db.query(`
        select * from posts where id_localidad_fk = ?
    `, [ id ])
}

exports.deleteLocalidad = (id) => {
	return db.query(`
		delete from localidades where id = ?
	`, [ id ])
}
