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
