import express from 'express';
import multer from "multer";
import { storeImage } from './uploadImageRouter.js';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storeImage);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});


const upload = multer({
  storage: storage,
});

router.get('/:filename', upload.single('avatar'), async (req, res, next) => {
  const src = storeImage +'/'+req.params.filename;
  res.sendFile(src)
   
})

export { router as getAvatarRouter }
