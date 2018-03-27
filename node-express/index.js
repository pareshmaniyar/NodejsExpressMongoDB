const express = require('express');						//it is third party module
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hostname = 'localhost';
const port = 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());     //using middleware: parse body of the request message and added to req.body
app.all('/dishes', (req, res, next) => {
	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/plain');
  	next();//continue to search for additional specifications to pass on to other calls
});
app.get('/dishes', (req, res, next) => {
	res.end("Will send you dishes soon!");
});
app.post('/dishes', (req, res, next) => {
	res.end("will add the dish: " + req.body.name + " and " + req.body.description);
});
app.put('/dishes', (req, res, next) => {
	res.statusCode = 403;
	res.end("Put not supported");
});
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});
app.get('/dishes/:dishId', (req,res,next) => {//gets stored in params in req
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});
app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on specific dish'+ req.params.dishId);
});
app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');//write a line to reply message
  res.end('Will update the dish: ' + req.body.name + ' and: ' + req.body.description);
});
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

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
})
