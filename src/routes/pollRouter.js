import express from "express";
import {
  postPoll,
  getPoll,
  getChoiceById,
  getPollResult,
} from "../controllers/pollController.js";
import pollValidate from "../middlewares/pollValidateMiddleware.js";
import idValidate from "../middlewares/idValidateMiddleware.js";

const router = express.Router();

router.post("/poll", pollValidate, postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", idValidate, getChoiceById);
router.get("/poll/:id/result", idValidate, getPollResult);

export default router;
