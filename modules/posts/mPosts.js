const db = require('../../config/db').db()

exports.insertPost = (obj) => {
	return db.query(`
		insert into posts (descripcion, descripcion_corta, precio, 
		fecha_creacion, id_inmobiliaria_fk, id_localidad_fk, id_categoria_fk, id_tipopropiedad_fk) 
		values (?, ?, ?, curdate(), ?, ?, ?, ?)
	`, [ obj.descripcion, obj.descripcion_corta, obj.precio, obj.idInmobiliaria, obj.localidad, obj.categoria, obj.tipopropiedad ])
}

exports.insertFotos = (idPost, nombre) => {
	return db.query(`
		insert into fotos_x_posts
		(id_post_fk, path)
		values (?, ?)
	`, [ idPost, nombre ])
}

exports.getByInmobiliaria = (id) => {
	return db.query(`
		select p.*, i.nombre, DATE_FORMAT(p.fecha_creacion,'%d/%m/%Y') AS fecha, l.nombre as localidadtxt 
		from posts p
		left join inmobiliarias i on i.id = p.id_inmobiliaria_fk
		left join localidades l on l.id = p.id_localidad_fk
		where id_inmobiliaria_fk = ?
	`, [ id ])
}

exports.getFotosByPost = (id) => {
	return db.query(`
		select * from fotos_x_posts where id_post_fk = ?
	`, [ id ])
}

exports.getFotoById = id => {
	return db.query(`
		select * from fotos_x_posts where id = ?
	`, [ id ])
}

exports.deletePost = (id, idInmobiliaria) => {
	return db.query(`
		delete from posts where id = ? and id_inmobiliaria_fk = ?
	`, [ id, idInmobiliaria ])
}

exports.deleteFotos = (id) => {
	return db.query(`
		delete from fotos_x_posts where id_post_fk = ?
	`, [ id ])
}

exports.deleteFotoById = (id) => {
	return db.query(`
		delete from fotos_x_posts where id = ?
	`, [ id ])
}

exports.getPostById = id => {
	return db.query(`
		select p.*, ifnull(p.titulo, '') as titulotxt, i.nombre, DATE_FORMAT(p.fecha_creacion,'%d/%m/%Y') AS fecha, l.nombre as localidadtxt 
		from posts p
		left join inmobiliarias i on i.id = p.id_inmobiliaria_fk
		left join localidades l on l.id = p.id_localidad_fk
		where p.id = ?
	`, [ id ])
}