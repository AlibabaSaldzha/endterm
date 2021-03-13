var http = require("http")
var fs = require("fs")

function serveStaticFile(messegeType, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            messegeType.writeHead(500, {"Content-Type":"text/html"})
            messegeType.end("500 - Internal error")
        }
        else{
            messegeType.writeHead(responseCode, {"Content-Type":contentType})
            messegeType.end(data)
        }
    })
}
        

http.crateServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path) {
        case "":
            serveStaticFile(res, "/index.html", "text/html")
            break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html")
            break;
        case "/img/logo":
            serveStaticFile(res, "/img/logo.jpg", "image/jpeg")
            break;
        default:
            serveStaticFile(res, "/error.html", "text/html", 404)
            break;
    }
}).listen(3000)


console.log("The server is running on localhost:3000. Press CTRL+C to terminate...")