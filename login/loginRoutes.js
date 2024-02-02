import express from "express";
import { login } from "./login.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
   res.json(await login(req.query))
})

export { router as loginRouter }
