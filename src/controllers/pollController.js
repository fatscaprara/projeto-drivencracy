import db from "../database/db.js";

export async function postPoll(req, res) {
  const poll = req.body;

  if (!poll.title) {
    return res.sendStatus(422);
  }

  if (!poll.expireAt) {
    const nowDate = new Date().getTime();
    const thirtyDaysInMiliseconds = 30 * 24 * 60 * 60 * 1000;
    const at30days = new Date(nowDate + thirtyDaysInMiliseconds);
    const at30daysInString = `${at30days.getFullYear()}-${
      at30days.getMonth() + 1
    }-${at30days.getDate()} 00:00`;

    poll.expireAt = at30daysInString;
  }

  try {
    await db.collection("poll").insertOne(poll);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.status(201).send(poll);
}
