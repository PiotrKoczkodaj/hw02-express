import mongoose from "mongoose";
import path from 'path';
import fs from "fs/promises";
import multer from "multer";
import express, { response } from 'express';
import createError from 'http-errors';
import gravatar from 'gravatar';
import 'dotenv/config';

const app = express();
const uploadDir = path.join(process.cwd(), 'public');
const storeImage = path.join(uploadDir, 'avatars')

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

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  const { description } = req.body;
  console.log(req.file)
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: 'Plik załadowany pomyślnie', status: 200 });
});

app.get('/avatar/:filename', upload.single('avatar'), async (req, res, next) => {

  const src = storeImage +'/'+req.params.filename;
res.sendFile(src)

})

app.use((req, res, next) => {
  next(createError(404));
});

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIfNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

const connection = mongoose.connect(process.env.DB_HOST).catch(error => {
  console.log(process.error);
  process.exit(1)
}).finally(() => {
  console.log("Database connection successful")
})

app.listen(3000, () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
  console.log("Server running. Use our API on port: 3000")
})