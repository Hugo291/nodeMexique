//random integer
var randomInt = require('random-int');
//pdf to jpg
var pdf2img = require('pdf2img');
//date (now)
var date = require('date-and-time');
//file system
var fs = require('fs');
//folder not exist
var mkdirp = require('mkdirp');


module.exports = function(req,res){

    //If request has  no files stop the proccess
    if (!req.files)
        return res.send('No files were uploaded.');

    //The format of file
    var format = 'jpg';
    //The date and hour of noww
    var now = new Date();
    //The name of file generate YYYYMMDDHHmmss + RandomInt
    var filename = date.format(now, 'YYYYMMDDHHmmss' )+randomInt(10,10000);
    //Set the var file
    var pdfFileUpload = req.files.documentPdf;

    //Ckeck if the type is pdf
    if(pdfFileUpload.mimetype !== 'application/pdf'){
        return res.send('Type incorrect');
    }

    //Destionation of final pdf (The big file)
    var destPdfFile = 'uploads\\pdf\\'+filename+'.pdf';

    pdfFileUpload.mv(destPdfFile, function(err) {
        //if error during the mv
        if (err) {
            console.log(err);
            return res.send('Erreur lors du mouvement du fichier');
        }

        console.log('the file is upload');
        //pdf options
        pdf2img.setOptions({
            type: 'jpg',
            size: 1024,
            density: 200,
            outputdir: 'uploads/'+format+'/'+filename,
            outputname: null,
            page: null
        });

        //Create a folder where images are stored
        mkdirp('uploads/'+format+'/'+filename, function(err) {

            if(err) {
                console.log(err);
                return res.send('Error creation of ');
            }

            console.log('Convertion of pdf to jpg');
            //Convert destpdffile to images
            pdf2img.convert(destPdfFile, function(err, info) {
                if (err) {
                    console.log(err);
                    return res.send('Erreur lors du mouvement du fichier');
                }else
                    //OCR is here
                    console.log(info);
                res.render('translate/selectionExtract',{'data':info});
            });//END pdf2img.convert

        });//END mkdirp

    });//End pdfFileUpload

};

