const db = require('../config/db').db()

exports.getPosts = () => {
	return db.query(`
		select *, DATE_FORMAT(fecha_creacion,'%d/%m/%Y') AS fecha from posts
	`, [])
}

exports.getFotos = (id) => {
	return db.query(`
		select * from fotos_x_posts 
		where id_post_fk = ?
	`, [ id ])
}

exports.getCountByUbicacion = () => {
	return db.query(`
		select l.nombre as nombre, count(p.id_localidad_fk) as suma from posts p
		left join localidades l on l.id = p.id_localidad_fk
		group by p.id_localidad_fk
	`, [])
}