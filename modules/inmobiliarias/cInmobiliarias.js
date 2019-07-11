const mInmobiliarias = require('./mInmobiliarias.js')

exports.getAll = (req, res) => {
    res.render('inmobiliarias/views/lista')
}

exports.postLogin = (req, res) => {
	const { usuario, contraseña } = req.body
	mInmobiliarias.getUserInmobiliaria(usuario, contraseña)
	.then(data => {
		console.log(data)
		req.session.user = data[0]
        req.session.auth = true
        req.session.user.rol = "inmobiliaria"
        req.session.save()
		res.send(data)
	}) 
}

exports.getInicio = (req, res) => {
	console.log(req.session.user)
	res.render('inmobiliarias/views/inicio')
}