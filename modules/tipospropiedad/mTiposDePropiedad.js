const db = require('../../config/db').db()

exports.getAll = () => {
    return db.query(`
        select * from tipospropiedad order by nombre
    `, [])
}


exports.getById = (id) => {
    return db.query(`
        select * from tipospropiedad where id = ?
    `, [ id ])
}

exports.insertTipoPropiedad = (obj) => {
    return db.query(`
        insert into tipospropiedad (nombre) values (?)
    `, [obj.nombre])
}

exports.updateTipoPropiedad = (obj) => {
    return db.query(`
        update tipospropiedad set nombre = ? where id = ?
    `, [ obj.nombre, obj.idTipoPropiedad ])
}

exports.getPostsByTipoPropiedad = (id) => {
    return db.query(`
        select * from posts where id_tipopropiedad_fk = ?
    `, [ id ])
}

exports.deleteTipoPropiedad = (id) => {
    return db.query(`
        delete from tipospropiedad where id = ?
    `, [ id ])
}