// Setup storage for files
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  //comment-out for vercel server
  destination: (req, file, cb) => {
      cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {

    let type: string='';
    if(file.mimetype.split('/')[0] === "image"){
       type="image"
    }

    if(file.mimetype.split('/')[0] !== "image" && file.originalname.split('.')[1] === "pdf"){
       type="pdf"
    }

    if(file.mimetype.split('/')[0] !== "image" && file.originalname.split('.')[1] !== "pdf"){
       type="note"
    }

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const uniqueSuffix = type+"_"+randomNumber + ".";
    const extension = file.originalname.split('.')[1];

    cb(null, uniqueSuffix+extension);
  },
});

const upload = multer({ storage });

export default upload;
