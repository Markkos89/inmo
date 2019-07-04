const express = require('express')
const app = express()

const session = require('express-session')
let bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
let methodoverride = require('method-override')
let consolidate = require('consolidate')
let logfmt = require("logfmt");

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', __dirname+'/modules')
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodoverride())
app.use(cookieParser('algodificil'))

app.use(session({ 
	secret: 'algodificil',
    resave: false,
    saveUninitialized: true
}))

app.use( (req, res, next) => {
    if ( req.session.user != undefined && req.session.user != null ) {
        app.locals.user = req.session.user.Usuario
    } else {
    	app.locals.user = null
    }
    next()
})

app.use(logfmt.requestLogger({elapsed: 'time'}, (req, res) => {
  	return {
	    "method": req.method,
	    "path": req.path
  	}
}));


app.use(require('./routes'))


let port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`Listening on ${port}`))

