import { auth } from "../login/middleware.js";
import express from "express";
import { modificationPicture } from "../tmp/modificationPictures.js";
import multer from "multer";
import path from "path";
import { User } from "../registeration/userSchema.js";

const router = express.Router();

export const uploadDir = path.join(process.cwd(), "tmp");
export const storeImage = path.join(uploadDir, "picturesToModification");

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

router.patch("/", auth, upload.single("avatar"), async (req, res, next) => {
  const user = req.user;
  const fileName = req.file.originalname;

  modificationPicture(
    `tmp/picturesToModification/${fileName}`,
    `${process.cwd()}/public/avatars/UserId_${user.id}.JPG`
  );
  await User.findOneAndUpdate(
    { _id: user.id },
    { avatarUrl: `${process.cwd()}/public/avatars/UserId_${user.id}.JPG` }
  );
  res.json({ avatarUrl: req.file.path });
});

export { router as updateAvatarRouter };
