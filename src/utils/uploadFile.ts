import multer from "multer"
import path from "path"

const diskStorage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, '../../images'))
    },
    filename(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
})

export const uploadFile = multer({ storage: diskStorage })