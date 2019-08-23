const mTiposDePropiedad = require('./mTiposDePropiedad.js')

exports.getLista = (req, res) => {
    res.render('tipospropiedad/views/lista')
}

exports.listaajax = (req, res) => {
	mTiposDePropiedad.getAll()
	.then(tipos => res.render('tipospropiedad/views/tabla', { tipos }))
}

exports.getModificar = (req, res) => {
	mTiposDePropiedad.getById(req.params.id)
	.then(tipo => res.send(tipo))
}

exports.postTipoPropiedad = async (req, res) => {
	let resultado
	let mensaje

	if ( req.body.accion == "N" ) {
		resultado = await mTiposDePropiedad.insertTipoPropiedad(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Tipo de Propiedad Agregada" }
	} else {
		resultado = await mTiposDePropiedad.updateTipoPropiedad(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Tipo de Propiedad Modificada" }
	}

	console.log("ROWS AFFECTED ", resultado.affectedRows)
	if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	res.send(mensaje)
}

exports.getEliminar = async (req, res) => {
	let mensaje = { tipo: "success", titulo: "Exito", texto: "Tipo de Propiedad Eliminada" }
	let posts = await mTiposDePropiedad.getPostsByTipoPropiedad(req.params.id)
	if ( posts.length ) {
		mensaje = { 
			tipo: "warning", 
			titulo: "Alerta", 
			texto: `No puede borrar este tipo de propiedad ya que el mismo esta siendo utilizado en ${posts.length} post${posts.length > 1 ? "s" : ""}` 
		}
	} else {
		let resultado = await mTiposDePropiedad.deleteTipoPropiedad(req.params.id)
		if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	}
	res.send(mensaje)
}