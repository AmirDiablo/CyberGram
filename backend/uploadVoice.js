const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '../frontend/public/voices'); 
    },

    filename: (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const uploadedVoice = multer({ storage: storage });

module.exports = uploadedVoice;