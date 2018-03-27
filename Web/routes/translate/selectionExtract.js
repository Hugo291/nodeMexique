var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function(req,res){

    //tramission of form
    var form = new formidable.IncomingForm();
    //The upload dir
    form.uploadDir = __dirname+'\\uploads\\';
    //If the the keep the extension in name
    form.keepExtensions = true;
    //if allow mutliple files upload
    form.multiples = false;
    //Begin of upload file
    form.on('fileBegin', function(name, file) {

        //If format is png
        if(path.extname(__dirname+'\\upload\\'+file.name).toLowerCase() === ".png"){
            //Rename of file
            file.path = form.uploadDir+file.name;
            //console.log("Path : "+__dirname+'\\upload\\'+file.name);
            console.log("FileName  : "+file.name);

            //In end of upload
            form.on('end', function() {
                console.log('upload is finish');
            });

            var spawn = require('child_process').spawn,
            py = spawn('python', ['AnalyseImage.py' , file.path]),
            dataString = '';

            py.stdout.on('data', function(data){
                dataString += data.toString();
            });

            /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
            py.stdout.on('end', function(){
                console.log('Sum of numbers=',dataString);
                res.render("translate/selectionExtract.twig",{'data':dataString} );
            });
        }else{
            res.redirect('upload?error=fileformat');
        }
    });

    form.on('part',function () {

    });
    //Transmission of req to file
    form.parse(req);

};