const db = require('../../config/db').db()

exports.insertPost = (obj) => {
	return db.query(`
		insert into posts (descripcion, descripcion_corta, precio, 
		fecha_creacion, id_inmobiliaria_fk, id_localidad_fk) 
		values (?, ?, ?, curdate(), ?, ?)
	`, [ obj.descripcion, obj.descripcion_corta, obj.precio, obj.idInmobiliaria, obj.localidad ])
}

exports.insertFotos = (idPost, nombre) => {
	return db.query(`
		insert into fotos_x_posts
		(id_post_fk, path)
		values (?, ?)
	`, [ idPost, nombre ])
}