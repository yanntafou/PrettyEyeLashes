import multer from "multer";

// a middleware to send multiple objectd like image
const storage = multer.diskStorage({
    filename:function (req,file,callback) {
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload