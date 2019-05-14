const express = require('express')
const app = express()

let bodyParser = require('body-parser')
let methodoverride = require('method-override')
let consolidate = require('consolidate')
let logfmt = require("logfmt");

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', __dirname+'/views')
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodoverride())

app.use(logfmt.requestLogger({elapsed: 'time'}, (req, res) => {
  	return {
	    "method": req.method,
	    "path": req.path
  	}
}));

app.use(require('./routes'))

let port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`Listening on ${port}`))

