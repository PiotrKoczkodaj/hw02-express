import {auth} from '../login/middleware.js'
import express from "express";
import { logout } from "./logout.js";

const router = express.Router();

router.get("/",auth,async (req, res, next) => {
  res.json(await logout(req));
});

export { router as logoutRouter };
