import express from "express";
import { postPoll } from "../controllers/pollController.js";

const router = express.Router();

router.post("/poll", postPoll);

export default router;
