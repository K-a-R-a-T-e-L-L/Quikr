const multer = require('multer');
const path = require('path');

const StorageFiles = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: StorageFiles});

module.exports = {upload};