const express = require('express')
const router = express.Router()

const cInmobiliarias = require('./modules/inmobiliarias/cInmobiliarias')

router.get('/', (req, res) => {
	const slider = [
		{
			titulo: 'Slide One',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		},
		{
			titulo: 'Slide Two',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		},
		{
			titulo: 'Slide Three',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		},
		{
			titulo: 'Slide Four',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		},
		{
			titulo: 'Slide Five',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		},
		{
			titulo: 'Slide Six',
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero!'
		}
	]
	const alquileres = [
		{ 
			id: 1,
			titulo: 'Venta Terreno Comercial en Loteo Colonial', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			id: 2,
			titulo: 'Alquiler Terreno', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			id: 3,
			titulo: 'Otro alquiler', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			id: 4,
			titulo: 'Otra Venta', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		}
	]
	res.render('index', {
		alquileres,
		slider
	})
})

router.get('/Admin', (req, res) => {
	res.render('superuser/views/login', {
		pagename: 'Login Admin',
		login: true
	})
})

router.get('/Inmobiliarias', cInmobiliarias.getAll)

router.post('/Inmobiliarias/Acesso', cInmobiliarias.postLogin)

module.exports = router