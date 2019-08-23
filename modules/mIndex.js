const db = require('../config/db').db()

exports.getPosts = () => {
	return db.query(`
		select p.*, DATE_FORMAT(p.fecha_creacion,'%d/%m/%Y') AS fecha, l.nombre as localidadtxt,
		c.nombre as categoriatxt
		from posts p
		left join localidades l on l.id = p.id_localidad_fk
		left join categorias c on c.id = p.id_categoria_fk
	`, [])
}

exports.getPostsByUbicacion = (array) => {
	let query = `
		select p.*, DATE_FORMAT(p.fecha_creacion,'%d/%m/%Y') AS fecha, l.nombre as localidadtxt,
		c.nombre as categoriatxt
		from posts p
		left join localidades l on l.id = p.id_localidad_fk
		left join categorias c on c.id = p.id_categoria_fk
		where p.id_localidad_fk = ${array[0]}
	`
	let string = ''
	if ( array.length > 1 ) {
		for ( x = 1; x < array.length; x++ ) {
			string += ` or p.id_localidad_fk = ${array[x]} `
		}
	}

	query += string;
	return db.query(query, []);
}

exports.getFotos = (id) => {
	return db.query(`
		select * from fotos_x_posts 
		where id_post_fk = ?
	`, [ id ])
}

exports.getCountByUbicacion = () => {
	return db.query(`
		select p.id_localidad_fk as idLocalidad, l.nombre as nombre, count(p.id_localidad_fk) as suma from posts p
		left join localidades l on l.id = p.id_localidad_fk
		group by p.id_localidad_fk
	`, [])
}

exports.getCountByCategoria = () => {
	return db.query(`
		select p.id_categoria_fk as idCategoria, c.nombre as nombre, count(p.id_categoria_fk) as suma 
		from posts p
		left join categorias c on c.id = p.id_categoria_fk
		group by p.id_categoria_fk
	`, [])
}

exports.getCountByTipoPropiedad = () => {
	return db.query(`
		select p.id_tipopropiedad_fk as idTipoPropiedad, t.nombre as nombre, count(p.id_tipopropiedad_fk) as suma 
		from posts p
		left join tipospropiedad t on t.id = p.id_tipopropiedad_fk
		group by p.id_tipopropiedad_fk
	`, [])
}