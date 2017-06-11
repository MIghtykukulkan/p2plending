var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.listen(3000, function() {
    console.log("Server is running......");
});

app.get('/', function(req, res) {
    res.send({ "name": "umashankar", "email": "uma.s.shankar@gmail.com" })
});

app.post('/testmethod', function(req, res) {

    console.log(req.body)

    res.send({ "name": "umashankar", "email": "uma.s.shankar@gmail.com" });
});