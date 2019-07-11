const mLocalidades = require('./mLocalidades')

exports.getLista = (req, res) => {
	res.render("localidades/views/lista")
}

exports.listaajax = async (req, res) => {
	mLocalidades.getLocalidades()
	.then(localidades => res.render("localidades/views/tabla", { localidades }))
}