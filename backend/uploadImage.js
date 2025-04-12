const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '../frontend/public/images'); 
    },

    filename: (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb)=> {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jfif"){
        cb(null, true)
    }else{
        cb(new Error("Only png, jpg, jpeg and jfif are allowed"))
    }
}

const uploadedImage = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadedImage;