import db from "../database/db.js";

export async function postPoll(req, res) {
  const { poll } = req;

  try {
    await db.collection("poll").insertOne(poll);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.status(201).send(poll);
}

export async function getPoll(req, res) {
  try {
    const polls = await db.collection("poll").find().toArray();
    res.send(polls);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
