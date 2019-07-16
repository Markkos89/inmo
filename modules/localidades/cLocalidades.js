const mLocalidades = require('./mLocalidades')

exports.getLista = (req, res) => {
	res.render("localidades/views/lista")
}

exports.listaajax = async (req, res) => {
	mLocalidades.getLocalidades()
	.then(localidades => res.render("localidades/views/tabla", { localidades }))
}

exports.getModificar = (req, res) => {
	mLocalidades.getById(req.params.id)
	.then(localidad => res.send(localidad))
}

exports.postLocalidad = async (req, res) => {
	let resultado
	let mensaje

	if ( req.body.accion == "N" ) {
		resultado = await mLocalidades.insertLocalidad(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Localidad Agregada" }
	} else {
		resultado = await mLocalidades.updateLocalidad(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Localidad Modificada" }
	}

	console.log("ROWS AFFECTED ", resultado.affectedRows)
	if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	res.send(mensaje)
}

exports.getEliminar = async (req, res) => {
	let mensaje = { tipo: "success", titulo: "Exito", texto: "Localidad Eliminada" }
	let resultado = await mLocalidades.deleteLocalidad(req.params.id)
	if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	res.send(mensaje)
}