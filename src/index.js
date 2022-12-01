import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pollRouter from "./routes/pollRouter.js";
import choiceRouter from "./routes/choiceRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(pollRouter);
app.use(choiceRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening in port: ${port}`);
});
