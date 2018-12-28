const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

//get method
app.get('/dishes', (req, res, next) => {
    res.end('will send all the dishes to you');
});

//post method
app.post('/dishes', (req, res, next) => {
    res.end('will add the dish:' + req.body.name + 'with details: ' + req.body.description);
});

//put method
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('put operation not supported on dishes');
});

//delete method
app.delete('/dishes', (req, res, next) => {
    res.end('deleting all the dishes');
});


//get method
app.get('/dishes/:dishId', (req, res, next) => {
    res.end('will send details of the dish' + req.params.dishId + 'to you');
});

//post method
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/' + req.params.dishId);
});

//put method
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('updating the dish:' + req.params.dishId + '\n');
    res.end('will update the dish:' + req.body.name + 'with details:' + req.body.description);
});

//delete method
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('deleting dish: ' + req.params.dishId);
});



app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Conten-Type', 'text/html');
    res.end('<html><body><h1>this is an express server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})