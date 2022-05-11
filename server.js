const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')

const PORT = 3000
const api = require('./api') 
const app = express()  //instance of express
const server = http.createServer(app);

const db = require("./model");

global.__basedir = __dirname;

const env = process.env.NODE_ENV || 'development';

app.use(cors({ origin: "*" }))


app.use(express.json({limit: '1024mb'}));
app.use(express.urlencoded({limit: '1024mb', extended: true}));

app.use('/api', api);

db.sequelize.sync().then(function() {
    console.log("Database Connected");
})    


server.listen(PORT,'0.0.0.0', function(){
    console.log('Express server listening on port: ' + PORT);
});