import express from "express";
import {
  postPoll,
  getPoll,
  getChoiceById,
} from "../controllers/pollController.js";
import pollValidate from "../middlewares/pollValidateMiddleware.js";
import idValidate from "../middlewares/idValidateMiddleware.js";

const router = express.Router();

router.post("/poll", pollValidate, postPoll);
router.get("/poll", getPoll);
router.get("/poll/:id/choice", idValidate, getChoiceById);

export default router;
