const express = require('express')
const router = express.Router()

const cIndex = require('./modules/cIndex')
const cInmobiliarias = require('./modules/inmobiliarias/cInmobiliarias')
const cSuperuser = require('./modules/superuser/cSuperuser')
const cLocalidades = require('./modules/localidades/cLocalidades')
const cCategorias = require('./modules/categorias/cCategorias')
const cTiposDePropiedad = require('./modules/tipospropiedad/cTiposDePropiedad')
const cPosts = require('./modules/posts/cPosts')

function auth(req, res, next) {
	if (req.session.auth) {
	    return next()
	} else {
	    res.redirect('/')
	}	
}

function logout(req, res) {
    req.session.destroy(err => {
        if (!err){
        	console.log("cerrando sesion")
            res.redirect('/')
        }else{
        	console.log("hubo un error")
            console.log(err)
        }
    })
}

router.get('/', cIndex.getIndex)
router.get('/posts', cIndex.getPosts)
router.get('/logout', logout)
router.post('/post/filtro', cIndex.getFiltroPosts)

// RUTAS ADMIN

    // LOGIN
    router.get('/Admin', cSuperuser.getLogin)
    router.post('/Admin/Login', cSuperuser.postLogin)

    // INICIO
    router.get('/Admin/Inicio', auth, cSuperuser.getInicio)
    router.get('/Admin/Inicio/listaajax', cSuperuser.listaajax)

    // INMOBILIARIAS
    router.post('/Admin/Inmobiliarias', cSuperuser.postInmobiliarias)
    router.get('/Admin/Inmobiliaria/:id', cSuperuser.getModificarInmobiliaria)
    router.get('/Admin/Inmobiliaria/Eliminar/:id', cSuperuser.getEliminar)

    // LOCALIDADES
    router.get('/Admin/Localidades', auth, cLocalidades.getLista)
    router.get('/Admin/Localidades/listaajax', cLocalidades.listaajax)
    router.post('/Admin/Localidades/postLocalidad', cLocalidades.postLocalidad)
    router.get('/Admin/Localidades/Modificar/:id', cLocalidades.getModificar)
    router.get('/Admin/Localidades/Eliminar/:id', cLocalidades.getEliminar)

    // CATEGORIAS
    router.get('/Admin/Categorias', auth, cCategorias.getLista)
    router.get('/Admin/Categorias/listaajax', cCategorias.listaajax)
    router.post('/Admin/Categorias/postCategoria', cCategorias.postCategoria)
    router.get('/Admin/Categorias/Modificar/:id', cCategorias.getModificar)
    router.get('/Admin/Categorias/Eliminar/:id', cCategorias.getEliminar)

    // TIPOS DE PROPIEDAD
    router.get('/Admin/TiposdePropiedad', auth, cTiposDePropiedad.getLista)
    router.get('/Admin/TiposdePropiedad/listaajax', cTiposDePropiedad.listaajax)
    router.post('/Admin/TiposdePropiedad/postTipoPropiedad', cTiposDePropiedad.postTipoPropiedad)
    router.get('/Admin/TiposdePropiedad/Modificar/:id', cTiposDePropiedad.getModificar)
    router.get('/Admin/TiposdePropiedad/Eliminar/:id', cTiposDePropiedad.getEliminar)

    // POSTS
    router.get('/Admin/Posts', auth, cPosts.getLista)
    router.get('/Admin/Posts/Inmobiliaria/:id', auth, cPosts.getListaById)
    router.get('/Admin/Posts/Inmobiliaria/Ajax/:id', auth, cPosts.getListaByIdAjax)
    router.get('/Admin/Posts/Alta/:id', auth, cPosts.getAlta)
    router.get('/Admin/Posts/Eliminar/:id/:id_inmobiliaria', cPosts.getEliminar)
    router.post('/Admin/Posts', cPosts.postAlta)
    router.post('/Admin/Post/Uploadfile', cPosts.postUploadFiles)

// RUTAS INMOBILIARIA
    router.get('/Inmobiliarias', cInmobiliarias.getAll)
    router.post('/Inmobiliarias/Acceso', cInmobiliarias.postLogin)
    router.get('/Inmobiliarias/Inicio', auth, cInmobiliarias.getInicio)

module.exports = router