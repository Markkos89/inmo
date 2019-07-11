const db = require('../../config/db').db()

exports.getLocalidades = () => {
	return db.query(`
		select * from localidades
	`, [])
}