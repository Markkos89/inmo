const express = require('express')
const router = express.Router()

const cIndex = require('./modules/cIndex')
const cInmobiliarias = require('./modules/inmobiliarias/cInmobiliarias')
const cSuperuser = require('./modules/superuser/cSuperuser')

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

router.get('/Admin', cSuperuser.getLogin)
router.post('/Admin/Login', cSuperuser.postLogin)
router.get('/Admin/Inicio', auth, cSuperuser.getInicio)
router.post('/Admin/Inmobiliarias', cSuperuser.postInmobiliarias)
router.get('/Admin/Inicio/listaajax', cSuperuser.listaajax)

router.get('/Inmobiliarias', cInmobiliarias.getAll)

router.post('/Inmobiliarias/Acesso', cInmobiliarias.postLogin)

module.exports = router