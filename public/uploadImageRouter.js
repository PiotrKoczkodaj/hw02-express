import path from 'path';
import multer from "multer";
import express from 'express';
import 'dotenv/config';
import fs from "fs/promises";
const router = express.Router();

export const uploadDir = path.join(process.cwd(), 'public');
export const storeImage = path.join(uploadDir, 'avatars')

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

router.post('/',upload.single('avatar'), async (req, res, next) => {
const { description } = req.body;
    const { path: temporaryName, originalname } = req.file;
    
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: 'Plik załadowany pomyślnie', status: 200 });
})

export {router as uploadImageRouter}