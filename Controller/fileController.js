
const fs = require("fs");
const { dirname } = require('path');
var multer  = require('multer');
var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

 const upload = multer({ storage: storage }).any('file')

const fileDownload = async (req, res) =>{
    try{
        const fileName = req.params.filename;
        const directoryPath = global.__basedir + "/uploads/"+ fileName ;
        const action = req.query.action.toLowerCase();
        switch(action){
            case 'download' :  
                res.download(directoryPath, fileName, (err) => {
                    if (err) {
                        res.status(500).json({ status:false, message: "COULD_NOT_DOWNLOAD_THE_FILE" , err });
                    }
                });
                break;
            
            case 'read' :   
                fs.readFile(directoryPath, "utf8", function(err, data){
                    if(err){
                        res.status(500).json({ status:false, message: "COULD_NOT_DOWNLOAD_THE_FILE" , err });
                    }
                    res.status(200).json({status:true, message: 'FILE_DATA', data});
                });
                break;
            
            default :
                res.status(400).json({status:false, message: 'WRONG_ACTION_VALUE'});

        }
    }catch(err){
        res.status(500).json({status:false, message: 'ERROR', err});
    } 
}

const fileUpload = async (req, res) =>{
    try{

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              return res.status(500).json({status:false, message: 'UPLOAD_FAIL', err});
            } else if (err) {
              return res.status(500).json({status:false, message: 'UPLOAD_FAIL', err});
            }
            
            res.status(201).json({status:true, message: 'UPLOAD_SUCCESSFULLY', path : ''});
          })

    }catch(err){
        res.status(500).json({status:false, message: 'ERROR', err});
    } 
}


module.exports = {
    fileDownload,
    fileUpload
    
}