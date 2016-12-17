var http = require("http");

const PORT=8080; 

http.createServer(function (request, resonse) {
	
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	response.end('Hello world\n');
	
}).listen(8080,"127.0.0.1");

console.log('Server running at http://127.0.0.1:8080');