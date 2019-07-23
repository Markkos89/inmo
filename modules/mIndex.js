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