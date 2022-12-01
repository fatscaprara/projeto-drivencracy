import db from "../database/db.js";

export async function postPoll(req, res) {
  const { poll } = req;

  try {
    await db.collection("poll").insertOne(poll);
    res.status(201).send(poll);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
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

export async function getChoiceById(req, res) {
  const id = req.id;

  try {
    const choices = await db
      .collection("choice")
      .find({ pollId: id })
      .toArray();

    res.send(choices);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
}
