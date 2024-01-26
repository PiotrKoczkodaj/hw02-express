import express from 'express';
import { userCurrent } from './userCurrent.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json(await userCurrent(req))
})

export { router as currentRouter}