import express from "express";
import { registerUser } from "./register.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
   res.json(await registerUser(req.query,res))
})

export { router as registerRouter }
