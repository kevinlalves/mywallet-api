import { sessions, users } from "../config/database.js";
import authenticateSchema from "../request_schemas/authenticate.js";
import validate from "../helpers/validate.js";

export default async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  const validRequest = validate({ token }, authenticateSchema, res);
  if (!validRequest) {
    return;
  }

  try {
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    res.locals.user = await users.findOne({ _id: ObjectId(session.userId) });
  }
  catch (error) {

  }

  next();
}
