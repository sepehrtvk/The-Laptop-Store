const fs = require('fs');
const http = require('http');
const url = require('url');
const json = fs.readFileSync(`${__dirname}/data/data.json`,'utf8');
const labTopData = JSON.parse(json);

const server = http.createServer((req, res) => {
     const pathName = url.parse(req.url,true).pathname;
     const id = url.parse(req.url,true).query.id;

     if(pathName === '/products' || pathName === '/' ){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('Products');

     } else if (pathName === '/laptop' && id<labTopData.length){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('laptop');

     } else {
         res.writeHead(404,{'Content-Type':'text/html'});
         res.end('URL was not in the server');
     }
});

server.listen(1337,'127.0.0.1',() => {

})