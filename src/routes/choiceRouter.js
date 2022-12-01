import express from "express";
import { postChoice, voteChoice } from "../controllers/choiceController.js";
import choiceValidate from "../middlewares/choiceValidateMiddleware.js";
import choiceExistValidate from "../middlewares/choiceExistValidateMiddleware.js";

const router = express.Router();

router.post("/choice", choiceValidate, postChoice);
router.post("/choice/:id/vote", choiceExistValidate, voteChoice);

export default router;
