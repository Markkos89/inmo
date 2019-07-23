const mLocalidades = require("./localidades/mLocalidades")
const mIndex = require('./mIndex')

exports.getIndex = async (req, res) => {
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
	const posts = await mIndex.getPosts()
	let cantByUbicacion = 0
	if ( posts.length ) {
		for ( x = 0; x < posts.length; x++ ) {
			posts[x].fotos = await mIndex.getFotos(posts[x].id)
		}

		cantByUbicacion = await mIndex.getCountByUbicacion()
	}
	// const alquileres = [
	// 	{ 
	// 		id: 1,
	// 		titulo: 'Venta Terreno Comercial en Loteo Colonial', 
	// 		precio: '$69.990',
	// 		fotos: [
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 		],
	// 		descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
	// 	},
	// 	{ 
	// 		id: 2,
	// 		titulo: 'Alquiler Terreno', 
	// 		precio: '$69.990',
	// 		fotos: [
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 		],
	// 		descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
	// 	},
	// 	{ 
	// 		id: 3,
	// 		titulo: 'Otro alquiler', 
	// 		precio: '$69.990',
	// 		fotos: [
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 		],
	// 		descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
	// 	},
	// 	{ 
	// 		id: 4,
	// 		titulo: 'Otra Venta', 
	// 		precio: '$69.990',
	// 		fotos: [
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 			{ path: 'background.jpg'},
	// 			{ path: 'background2.jpg'},
	// 		],
	// 		descripcion: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit hic maxime, voluptatibus labore doloremque vero! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat explicabo, maxime, assumenda.'
	// 	}
	// ]
	res.render('index', {
		slider,
		posts,
		cantByUbicacion
	})
}