const multer = require('multer');


    const storage = multer.diskStorage({
    
    destination: (req, file, callback) => {
        console.log(req);
        callback(null, 'images/foods/');
        
    },
    filename: (req, file, callback) => {
       
    callback(null,  Date.now()+file.originalname );

    }
});




module.exports = multer({storage: storage}).array('image');