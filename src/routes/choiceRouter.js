import express from "express";
import { postChoice } from "../controllers/choiceController.js";
import choiceValidate from "../middlewares/choiceValidateMiddleware.js";

const router = express.Router();

router.post("/choice", choiceValidate, postChoice);

export default router;
