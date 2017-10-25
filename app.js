var express = require("express");
var multer = require("multer");
var randomstring = require("randomstring");
var bodyParser = require('body-parser');

// configurations for the uploader
var config = require('config');
var storageLocation = config.get('location')
const TOKEN = config.get('key')
const PORT = config.get('port')

// use express to store the endpoints
var app = express();

// enable a way of actually stoting the file
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, storageLocation);
    },
    filename: function(req, file, callback) {
        var name = randomstring.generate(8);
        var f = file.originalname.split('.');
        var filetype = f[f.length -1];
        callback(null, name + "." + filetype);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// access the "imagecontent" item in the post request
var upload = multer({storage: storage}).single("imagecontent");

app.post('/uploadr/upload', (req, res) => {
    // make sure the body contains the token or the header itself does
    if (req.headers.token == TOKEN || req.body.token == TOKEN) {
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.end("Error uploading file");
            } else {
                return res.send(req.file);
            }
        });
    } else {
        return res.send("Error");
    }
});

app.get('/uploadr/generate', (req, res) => {
    if (req.query.len) {
        res.send(randomstring.generate(Math.abs(parseInt(req.query.len))));
    } else {
        res.send(randomstring.generate(8));
    }
});

app.listen(PORT, "127.0.0.1", () => {
    console.log(`\nApp started and listening on port ${PORT}`);
});
