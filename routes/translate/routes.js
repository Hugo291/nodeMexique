var express = require('express');
var router = express.Router();

//Files
var download = require('./download');
var upload = require('./upload');
var selectionExtract = require('./selectionExtract');

//Routes
// if  url = /translate/
router.get('/' , function (req , res) {
    res.redirect('/translate/upload');
});


//The page where the client choice the file to upload
router.get("/upload" , upload);

//The selection
//Where the file is upload and scan by ORC and transmitted to page
//this page allows the user to choose  a text to translate
//this page send(POST) the result of choice of client
router.post("/selectionExtract" , selectionExtract);

//Downlaod
// where the client dowload page trad
router.post("/download" , download);


module.exports = router;