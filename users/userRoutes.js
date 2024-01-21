import express from "express";
import { registerUser } from "./users.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
   res.json(await registerUser(req.query))
})


export { router as usersRouter }
