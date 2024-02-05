import express from "express";
import { verification } from "./verification.js";

const router = express.Router();

router.get('/:verificationToken', async (req, res, next) => {
   res.json(await verification(req,res,next))
})

export { router as verificationRouter }
