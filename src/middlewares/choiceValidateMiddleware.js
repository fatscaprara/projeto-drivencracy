import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export default async function choiceValidate(req, res, next) {
  const choice = req.body;

  if (!choice.title) {
    return res.sendStatus(422);
  }

  try {
    const findPoll = await db
      .collection("poll")
      .findOne({ _id: ObjectId(choice.pollId) });

    if (!findPoll) {
      return res.sendStatus(404);
    }

    const findChoice = await db
      .collection("choice")
      .findOne({ title: choice.title });

    if (findChoice) {
      return res.sendStatus(409);
    }

    const expirationPoll = dayjs(findPoll.expireAt, "YYYY:MM:DD HH:mm");
    const hasExpired = dayjs().isAfter(expirationPoll);

    if (hasExpired) {
      return res.sendStatus(403);
    }

    req.choice = choice;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
