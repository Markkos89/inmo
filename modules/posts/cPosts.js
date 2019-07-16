const mPosts = require('./mPosts')
const mInmobiliarias = require('../inmobiliarias/mInmobiliarias')
const mLocalidades = require('../localidades/mLocalidades')

exports.getLista = async (req, res) => {
    const inmobiliarias = await mInmobiliarias.getAll()
    res.render("posts/views/lista", {
        inmobiliarias
    })
}

exports.getAlta = async (req, res) => {
    const inmobiliaria = await mInmobiliarias.getById(req.params.id)
    const localidades = await mLocalidades.getLocalidades()
    res.render("posts/views/alta", {
        inmobiliaria,
        localidades
    })
}