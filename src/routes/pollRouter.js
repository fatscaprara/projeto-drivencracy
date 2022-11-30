import express from "express";
import { postPoll, getPoll } from "../controllers/pollController.js";
import pollValidate from "../middlewares/pollValidateMiddleware.js";

const router = express.Router();

router.post("/poll", pollValidate, postPoll);
router.get("/poll", getPoll);

export default router;
