const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	const alquileres = [
		{ 
			titulo: 'Venta Terreno Comercial en Loteo Colonial', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			titulo: 'Alquiler Terreno', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			titulo: 'Otro alquiler', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		},
		{ 
			titulo: 'Otra Venta', 
			precio: '$69.990',
			fotos: [
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
				{ path: 'background.jpg'},
				{ path: 'background2.jpg'},
			],
			descripcion: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
		}
	]
	res.render('index', {
		alquileres
	})
})

module.exports = router