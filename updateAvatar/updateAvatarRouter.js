import express from 'express';
import { auth } from '../login/middleware.js';
import multer from "multer";
import { storeImage } from '../public/uploadImageRouter.js';
import { User } from '../registeration/userSchema.js';

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

router.patch('/', auth, upload.single('avatar'), async (req, res, next) => {
    
    await User.findOneAndUpdate({ _id: req.user.id }, { avatarUrl: req.file.path });
    
   res.json({avatarUrl:req.file.path})
})

export {router as updateAvatarRouter}