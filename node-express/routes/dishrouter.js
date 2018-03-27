//handling of REST API endpoints
const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')//mounting of the express router in index endpoint
.all((req, res, next) => {
	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/plain');
  	next();//continue to search for additional specifications to pass on to other calls
})
.get((req, res, next) => {
	res.end("Will send you dishes soon!");
})
.post((req, res, next) => {
	res.end("will add the dish: " + req.body.name + " and " + req.body.description);
})
.put((req, res, next) => {
	res.statusCode = 403;
	res.end("Put not supported");
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.get((req,res,next) => {//gets stored in params in req
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on specific dish'+ req.params.dishId);
})
.put((req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');//write a line to reply message
  res.end('Will update the dish: ' + req.body.name + ' and: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});
module.exports = dishRouter;