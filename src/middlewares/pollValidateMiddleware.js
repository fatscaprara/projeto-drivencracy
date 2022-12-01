import dayjs from "dayjs";

export default function pollValidate(req, res, next) {
  const poll = req.body;

  if (!poll.title) {
    return res.sendStatus(422);
  }

  if (!poll.expireAt) {
    const at30days = dayjs().add(30, "days").format("YYYY-MM-DD HH:mm");

    poll.expireAt = at30days;
  }

  req.poll = poll;
  next();
}
