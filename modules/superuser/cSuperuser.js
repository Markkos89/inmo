const mSuperuser = require('./mSuperuser')

exports.getLogin = (req, res) => {
	res.render('superuser/views/login', {
		pagename: 'Login Admin',
		login: true
	})
}

exports.postLogin = async (req, res) => {
    console.log(req.body)
    const usuario = await mSuperuser.getUsuario(req.body)

    if ( usuario.length ) {
    	req.session.user = usuario[0]
        req.session.auth = true
        req.session.save()
    	res.send({ exito: "OK" })
    } else {
    	res.send({ error: 'Usuario o contraseña incorrecta' })
    }
}

exports.getInicio = (req, res) => {
	res.render('superuser/views/inicio', {
		pagename: 'Hola Bienvenido superuser'
	})
}

exports.postInmobiliarias = async (req, res) => {
    console.log(req.body)
    if ( req.body.accion == "N") {
        await mSuperuser.insertInmobiliaria(req.body)        
    } else {
        await mSuperuser.updateInmobiliaria(req.body)
    }
    res.send({ exito: "OK"})
}

exports.listaajax = async (req, res) => {
    const inmobiliarias = await mSuperuser.getInmobiliarias()
    res.render('superuser/views/tabla', {inmobiliarias})
}

exports.getModificarInmobiliaria = async (req, res) => {
    const inmobiliaria = await mSuperuser.getInmobiliariaById(req.params.id)
    res.send(inmobiliaria)
}

exports.getEliminar = async (req, res) => {
    await mSuperuser.deleteInmobiliaria(req.params.id)
    res.send({ exito: "OK" })
}