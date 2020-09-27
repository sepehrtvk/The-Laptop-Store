const fs = require('fs');
const http = require('http');
const json = fs.readFileSync(`${__dirname}/data/data.json`,'utf8');
const labTopData = JSON.parse(json);
const server = http.createServer((req, res) => {
    
});