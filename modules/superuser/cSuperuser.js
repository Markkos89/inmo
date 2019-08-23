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
    let mensaje;
    if ( req.body.accion == "N") {
        await mSuperuser.insertInmobiliaria(req.body)
        mensaje = { tipo: "success", titulo: "Exito", texto: "Inmobiliaria Agregada" }
    } else {
        await mSuperuser.updateInmobiliaria(req.body)
        mensaje = { tipo: "success", titulo: "Exito", texto: "Inmobiliaria Modificada" }
    }
    res.send(mensaje)
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
    let mensaje = { tipo: "success", titulo: "Exito", texto: "Inmobiliaria Eliminada" }
    let posts = await mSuperuser.getPostsByInmobiliaria(req.params.id)
    if ( posts.length ) {
        mensaje = { 
            tipo: "warning", 
            titulo: "Alerta", 
            texto: `No puede borrar esta inmobiliaria ya que la misma tiene ${posts.length} post${posts.length > 1 ? "s" : ""} publicado${posts.length > 1 ? "s" : ""}` 
        }
    } else {
        let resultado = await mSuperuser.deleteInmobiliaria(req.params.id)
        if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
    }
    res.send(mensaje)
}