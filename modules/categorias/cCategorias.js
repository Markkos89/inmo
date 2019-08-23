const mCategorias = require('./mCategorias.js')

exports.getLista = (req, res) => {
    res.render('categorias/views/lista')
}

exports.listaajax = (req, res) => {
	mCategorias.getAll()
	.then(categorias => res.render('categorias/views/tabla', { categorias }))
}

exports.getModificar = (req, res) => {
	mCategorias.getById(req.params.id)
	.then(categoria => res.send(categoria))
}

exports.postCategoria = async (req, res) => {
	let resultado
	let mensaje

	if ( req.body.accion == "N" ) {
		resultado = await mCategorias.insertCategoria(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Categoria Agregada" }
	} else {
		resultado = await mCategorias.updateCategoria(req.body)
		mensaje = { tipo: "success", titulo: "Exito", texto: "Categoria Modificada" }
	}

	console.log("ROWS AFFECTED ", resultado.affectedRows)
	if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	res.send(mensaje)
}

exports.getEliminar = async (req, res) => {
	let mensaje = { tipo: "success", titulo: "Exito", texto: "Categoria Eliminada" }
	let posts = await mCategorias.getPostsByCategoria(req.params.id)
	if ( posts.length ) {
		mensaje = { 
			tipo: "warning", 
			titulo: "Alerta", 
			texto: `No puede borrar esta categoria ya que la misma esta siendo utilizada en ${posts.length} post${posts.length > 1 ? "s" : ""}` 
		}
	} else {
		let resultado = await mCategorias.deleteCategoria(req.params.id)
		if ( !resultado.affectedRows ) mensaje = { tipo: "error", titulo: "Error", texto: "Hubo un error al procesar la solicitud" }
	}
	res.send(mensaje)
}