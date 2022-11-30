export default function pollValidate(req, res, next) {
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

  req.poll = poll;
  next();
}
