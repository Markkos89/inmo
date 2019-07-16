const express = require('express')
const router = express.Router()

const cIndex = require('./modules/cIndex')
const cInmobiliarias = require('./modules/inmobiliarias/cInmobiliarias')
const cSuperuser = require('./modules/superuser/cSuperuser')
const cLocalidades = require('./modules/localidades/cLocalidades')
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
router.get('/logout', logout)

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
    router.get('/Admin/Inmobiliaria/Elminar/:id', cSuperuser.getEliminar)

    // LOCALIDADES
    router.get('/Admin/Localidades', auth, cLocalidades.getLista)
    router.get('/Admin/Localidades/listaajax', cLocalidades.listaajax)
    router.post('/Admin/Localidades/postLocalidad', cLocalidades.postLocalidad)
    router.get('/Admin/Localidades/Modificar/:id', cLocalidades.getModificar)
    router.get('/Admin/Localidades/Eliminar/:id', cLocalidades.getEliminar)

    // POSTS
    router.get('/Admin/Posts', auth, cPosts.getLista)
    router.get('/Admin/Posts/Alta/:id', auth, cPosts.getAlta)

// RUTAS INMOBILIARIA
    router.get('/Inmobiliarias', cInmobiliarias.getAll)
    router.post('/Inmobiliarias/Acceso', cInmobiliarias.postLogin)
    router.get('/Inmobiliarias/Inicio', auth, cInmobiliarias.getInicio)

module.exports = router