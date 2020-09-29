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

        fs.readFile(`${__dirname}/templates/template-overview.html`,'utf8',(err , data)=> {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`,'utf8',(err , data)=> {
                const cardsOutput = labTopData.map(el => replaceTemplate(data,el)).join('');
                overviewOutput= overviewOutput.replace('{%CARDS%}',cardsOutput);
                res.end(overviewOutput);
            });
    
        });

     } else if (pathName === '/laptop' && id<labTopData.length){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf8',(err , data)=> {
            const laptop = labTopData[id];
            const output = replaceTemplate(data,laptop);
            res.end(output);
        });

     } else {
         res.writeHead(404,{'Content-Type':'text/html'});
         res.end('URL was not in the server');
     }
});

server.listen(1337,'127.0.0.1',() => {

});

function replaceTemplate(originalHTML , laptop){
    output = originalHTML.replace(/{%PRODUCTNAME%}/g,laptop.productName);
    output = output.replace(/{%IAMGE%}/g,laptop.image);
    output = output.replace(/{%PRICE%}/g,laptop.price);
    output = output.replace(/{%SCREEN%}/g,laptop.screen);
    output = output.replace(/{%CPU%}/g,laptop.cpu);
    output = output.replace(/{%STORAGE%}/g,laptop.storage);
    output = output.replace(/{%RAM%}/g,laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g,laptop.description);
    output = output.replace(/{%ID%}/g,laptop.id);
    return output;
};