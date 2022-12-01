import { ObjectId } from "mongodb";
import db from "../database/db.js";

export async function postChoice(req, res) {
  const choice = req.choice;
  try {
    await db.collection("choice").insertOne(choice);

    res.status(201).send(choice);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function voteChoice(req, res) {
  const { id: choiceId, currentDate, poll } = req;
  const voteDate = currentDate.format("YYYY-MM-DD HH:mm");

  try {
    await db.collection("votes").insertOne({
      choiceId,
      pollId: poll._id,
      voteDate,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
