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
	cantByUbicacion = await mIndex.getCountByUbicacion()
	let cantByCategoria = 0
	cantByCategoria = await mIndex.getCountByCategoria()
	let cantByTipoPropiedad = 0
	cantByTipoPropiedad = await mIndex.getCountByTipoPropiedad()
	res.render('index', {
		slider,
		cantByUbicacion,
		cantByCategoria,
		cantByTipoPropiedad
	})
}

exports.getPosts = async (req, res) => {
	const posts = await mIndex.getPosts();
	if ( posts.length ) {
		for ( x = 0; x < posts.length; x++ ) {
			posts[x].fotos = await mIndex.getFotos(posts[x].id);
		}
	}
	res.render('posts', { posts });
}

exports.getFiltroPosts = async (req, res) => {
	const { info } = req.body;
	let posts = await mIndex.getPostsByUbicacion(info);
	if ( posts.length ) {
		for ( x = 0; x < posts.length; x++ ) {
			posts[x].fotos = await mIndex.getFotos(posts[x].id);
		}
	}
	res.render('posts', { posts });
}