const mPosts = require('./mPosts')
const mInmobiliarias = require('../inmobiliarias/mInmobiliarias')
const mLocalidades = require('../localidades/mLocalidades')
const multer = require('multer')

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

exports.postAlta = async (req, res) => {
    console.log(req.body)
    let mensaje
    const resultado = await mPosts.insertPost(req.body)

    console.log("affectedRows ", resultado.affectedRows)
    if ( !resultado.affectedRows ) {
        mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud", insertId: null }
    } else {
        mensaje = { tipo: "success", titulo: "Exito", texto: "Post Agregado", insertId: resultado.insertId }
    }

    res.send(mensaje)
}

exports.postUploadFiles = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/posts');
        },
        filename: function (req, file, cb) {
            let ext = file.originalname;
            ext = ext.split('.')
            cb(null, 'Post' + Date.now() + '.' + ext[1])
        }
    });
    let upload = multer({storage : storage}).array('myFiles', 12);
    upload(req, res, async (err) => {
        if(err) return err;
        console.log(req.files)
        for (var x = 0; x < req.files.length; x++) {
            await mPosts.insertFotos(req.body.idPost, req.files[x].filename);
        }
        res.send({ exito: " OK "});
    });
}