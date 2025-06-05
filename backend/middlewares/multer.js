import multer from "multer";

/*
    Memory Storage will be used when it has to be immediately uploaded to cloud.
*/
const storage = multer.diskStorage({   
    /*
        This defines where the uploaded file should be stored.
        Typically it should be stored in a database like AWS, Cloudinary, etc but for now it will be stored
        in the server's filesystem only.
    */
    destination: function(req,file,cb) {
        cb(null,'public/profile');
    },
    /* 
        This defines what the filename should be.
        For now it will the original name of the file only.
    */
    filename: function(req,file,cb){
        const ext = file.originalname.split('.').pop();
        cb(null,file.originalname);
    }
})

const upload = multer({storage: storage})

export default upload;