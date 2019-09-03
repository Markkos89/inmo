const mPosts = require('./mPosts')
const mInmobiliarias = require('../inmobiliarias/mInmobiliarias')
const mLocalidades = require('../localidades/mLocalidades')
const mIndex = require('../mIndex')
const mCategorias = require('../categorias/mCategorias')
const mTiposDePropiedad = require('../tipospropiedad/mTiposDePropiedad')
const multer = require('multer')
const fs = require('fs');

exports.getLista = async (req, res) => {
    const inmobiliarias = await mInmobiliarias.getAll()
    res.render("posts/views/lista", {
        inmobiliarias
    })
}

exports.getListaById = async (req, res) => {
    const { id } = req.params
    const inmobiliaria = await mInmobiliarias.getById(id)
    console.log(inmobiliaria);
    const posts = await mPosts.getByInmobiliaria(id)
    res.render(`posts/views/lista`, { inmobiliaria, posts, id })
}

exports.getListaByIdAjax = async (req, res) => {
    const { id } = req.params
    const posteos = await mPosts.getByInmobiliaria(id)
    if ( posteos.length ) {
        for ( x = 0; x < posteos.length; x++ ) {
            posteos[x].fotos = await mIndex.getFotos(posteos[x].id);
        }
    }
    console.log(posteos)
    res.render('posts/views/posts', { posteos })
}

exports.getAlta = async (req, res) => {
    const inmobiliaria = await mInmobiliarias.getById(req.params.id)
    const localidades = await mLocalidades.getLocalidades()
    const categorias = await mCategorias.getAll()
    const tipoPropiedad = await mTiposDePropiedad.getAll()
    res.render("posts/views/alta", {
        inmobiliaria,
        localidades,
        categorias,
        tipoPropiedad
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

exports.getEliminar = async (req, res) => {
    const { id, id_inmobiliaria } = req.params;
    let mensaje;
    const fotos = await mPosts.getFotosByPost(id);
    for ( x = 0; x < fotos.length; x++ ) {
        remove_image(fotos[x].path)
    }
    await mPosts.deleteFotos(id)
    const resultado = await mPosts.deletePost(id, id_inmobiliaria);
    if ( !resultado.affectedRows ) {
        mensaje = { tipo: "error", titulo: "Error", texto: `Hubo un error al eliminar el post` } 
    } else {
        mensaje = { tipo: "success", titulo: "Exito", texto: `Post Eliminado` }
    }
    res.send(mensaje)
}

exports.getModificar = async (req, res) => {
    const { id, id_inmobiliaria } = req.params;
    const fotos = await mPosts.getFotosByPost(id);
    console.log("FOTOS ", fotos)
    const post = await mPosts.getPostById(id);
    console.log("POST ", post)
    const localidades = await mLocalidades.getLocalidades()
    const categorias = await mCategorias.getAll()
    const tipoPropiedad = await mTiposDePropiedad.getAll()
    res.render("posts/views/modificar", {
        fotos,
        post,
        localidades,
        categorias,
        tipoPropiedad
    })
}

exports.removeFoto = async (req, res) => {
    const { id } = req.params;
    const foto = await mPosts.getFotoById(id);
    if ( foto.length ) await remove_image(foto[0].path)
    await mPosts.deleteFotoById(foto[0].id)
    res.send({ mensaje: "OK" })
}

function remove_image(archivo) {
    return new Promise((resolve, reject) => {
        let path = `./public/uploads/posts/${archivo}`;
        console.log(path)
        fs.exists(path, function(exists) {
            if(exists) {
                console.log('*****************encontradoo*****************.');
                console.log('Archivo encontrado. Eliminando...');
                fs.unlink(path, function(){
                    console.log("archivo borrado!");
                    resolve()
                });
            } else {
                console.log('Archivo no encontrado, no se puede eliminar');
                resolve()
            }
        });
    })
}