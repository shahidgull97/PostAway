import jwt from "jsonwebtoken";
import { SessionModel } from "../features/Session/session.repository.js";
export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  const session = SessionModel.findOne({ token: jwtToken });
  if (!session) {
    return res.status(400).send("unauthorized! login to continue!");
  }
  jwt.verify(jwtToken, process.env.HASHKEY, (err, data) => {
    if (err) {
      res.status(400).send("unauthorized! login to continue!");
    } else {
      // console.log("data is", data);
      req._id = data._id;
      req.user = data.user;

      next();
    }
  });
};
