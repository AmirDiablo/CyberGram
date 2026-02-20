const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './uploads/wallpapers'); 
    },

    filename: (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb)=> {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jfif"){
        cb(null, true)
    }else{
        cb(new Error("Only png and jpeg and mp4 are allowed"))
    }
}

const uploadWallpaper = multer({ storage: storage, fileFilter: fileFilter });

module.exports = uploadWallpaper;