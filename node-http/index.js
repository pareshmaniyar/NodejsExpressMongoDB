const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;
const server = http.createServer((req,res) =>{														//setup the server
	console.log("Request for" + req.url + " and method " + req.method);
	if(req.method == 'GET'){																//Step 1: check the method
		var fileURL;
		if(req.url == '/') fileURL = '/index.html'; 							 // Step 2: check the URL, set default
		else fileURL = req.url;

		var filePath = path.resolve('./public'+fileURL);						//S3: translate into full fledged path
		const fileExt = path.extname(filePath); 
		if(fileExt == '.html'){ 															//S4: check file extension
			fs.exists(filePath, (exists) => {							 //first callback function, with exists method
				if(!exists){																  //if file doesn't exists
					res.statusCode = 404;//status code
          			res.setHeader('Content-Type', 'text/html');//header-content-type
          			res.end('<html><body><h1>Error 404: ' + fileURL + ' not found</h1></body></html>');
          			return;
        		}
        		res.statusCode = 200;
    			res.setHeader('Content-Type', 'text/html');
		        fs.createReadStream(filePath).pipe(res);			//reading file and sending in response body message
			});
		}else{
			res.statusCode = 404;
     		res.setHeader('Content-Type', 'text/html');
		    res.end('<html><body><h1>Error 404: ' + fileURL + ' not a HTML file</h1></body></html>');
		}
	}else{
	      res.statusCode = 404;
	      res.setHeader('Content-Type', 'text/html');
	      res.end('<html><body><h1>Error 404: ' + req.method + ' method not supported</h1></body></html>');	
	}
});
server.listen(port, hostname, () => {//start the server
	console.log(`Server running at http://${hostname}:${port}`);
});