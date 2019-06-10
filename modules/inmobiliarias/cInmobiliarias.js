const mInmobiliarias = require('./mInmobiliarias.js')

exports.getAll = (req, res) => {
    res.render('inmobiliarias/views/lista')
}

exports.postLogin = (req, res) => {
	console.log(req.body)
	const { usuario, contraseña } = req.body
	mInmobiliarias.getUserInmobiliaria(usuario, contraseña)
	.then(data => {
		res.send(data)
	}) 
}