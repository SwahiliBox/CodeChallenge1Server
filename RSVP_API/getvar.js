var port = 8000;
var http = require("http");
var server = http.createServer();
server.on('request', request);
server.listen(port);
function request(request, response) {
    var store = '';

    request.on('data', function(data) 
    {
        store += data;
    });
    request.on('end', function() 
    {  console.log(store);
        response.setHeader("Content-Type", "text/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.end(store)
    });
 }  