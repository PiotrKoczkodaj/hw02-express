import express from "express";
import { logout } from "./logout.js";
import {auth} from '../login/middleware.js'

const router = express.Router();

router.get("/",auth,async (req, res, next) => {
  res.json(await logout(req));
});

export { router as logoutRouter };
