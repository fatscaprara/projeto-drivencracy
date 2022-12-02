import { ObjectId } from "mongodb";
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

export async function getPollResult(req, res) {
  const { id, findPoll } = req;

  try {
    const [{ _id, votes }] = await db
      .collection("votes")
      .aggregate([
        {
          $match: { pollId: ObjectId(id) },
        },
        {
          $group: { _id: "$choiceId", votes: { $sum: +1 } },
        },
        {
          $sort: { votes: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    const result = await db
      .collection("choice")
      .findOne({ _id: ObjectId(_id) });

    res.send({
      ...findPoll,
      result: { title: result.title, votes },
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
