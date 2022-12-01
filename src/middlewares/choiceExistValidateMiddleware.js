import { ObjectId } from "mongodb";
import db from "../database/db.js";
import dayjs from "dayjs";

export default async function choiceExistValidate(req, res, next) {
  const { id } = req.params;

  try {
    const findChoice = await db
      .collection("choice")
      .findOne({ _id: ObjectId(id) });

    if (!findChoice) {
      return res.sendStatus(404);
    }

    const poll = await db
      .collection("poll")
      .findOne({ _id: ObjectId(findChoice.pollId) });

    const pollExpiration = dayjs(`${poll.expireAt}`, "YYYY-MM-DD HH:mm");
    const currentDate = dayjs();
    const hasExpired = currentDate.isAfter(pollExpiration);

    if (hasExpired) {
      res.sendStatus(403);
    }

    req.id = id;
    req.currentDate = currentDate;
    req.poll = poll;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
