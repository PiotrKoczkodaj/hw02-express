import {app} from './app.js'
import createError from 'http-errors';
import 'dotenv/config';
import fs from "fs/promises";
import mongoose from "mongoose";
import { uploadDir } from "./public/uploadImageRouter.js";
import { storeImage } from "./public/uploadImageRouter.js"

const connection = mongoose.connect(process.env.DB_HOST).catch(error => {
  console.log(process.error);
  process.exit(1)
}).finally(() => {
  console.log("Database connection successful")
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

app.listen(3000, () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);
  console.log("Server running. Use our API on port: 3000")
})
