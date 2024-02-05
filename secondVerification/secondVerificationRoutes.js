import express from "express";
import { secondVerification } from "./secondVerification.js";

const router = express.Router();

router.post('/', async (req, res, next) => {
   res.json(await secondVerification(req,res,next))
})

export { router as secondVerificationRouter }
