const db = require('../../config/db').db()

exports.getAll = () => {
    return db.query(`
        select * from categorias order by nombre
    `, [])
}


exports.getById = (id) => {
    return db.query(`
        select * from categorias where id = ?
    `, [ id ])
}

exports.insertCategoria = (obj) => {
    return db.query(`
        insert into categorias (nombre) values (?)
    `, [obj.nombre])
}

exports.updateCategoria = (obj) => {
    return db.query(`
        update categorias set nombre = ? where id = ?
    `, [ obj.nombre, obj.idCategoria ])
}

exports.getPostsByCategoria = (id) => {
    return db.query(`
        select * from posts where id_categoria_fk = ?
    `, [ id ])
}

exports.deleteCategoria = (id) => {
    return db.query(`
        delete from categorias where id = ?
    `, [ id ])
}