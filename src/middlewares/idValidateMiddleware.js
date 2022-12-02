import { ObjectId } from "mongodb";
import db from "../database/db.js";

export default async function idValidate(req, res, next) {
  const { id } = req.params;

  try {
    const findPoll = await db.collection("poll").findOne({ _id: ObjectId(id) });

    if (!findPoll) {
      return res.sendStatus(404);
    }

    req.id = id;
    req.findPoll = findPoll;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
