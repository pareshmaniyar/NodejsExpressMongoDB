const express = require('express');						//it is third party module
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const hostname = 'localhost';
const port = 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());     //using middleware: parse body of the request message and added to req.body
app.use('/dishes', dishRouter); //send to dishRouter
app.use(express.static(__dirname+'/public'));			//static html files will be served
app.use((req,res,next) => {
	//console.log(req.headers);
	res.statuscode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
const server = http.createServer(app);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});