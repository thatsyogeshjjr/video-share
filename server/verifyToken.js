import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "./error.js";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Not Authenticated!"));
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      next(createError(403, "Invalid Token"));
    }
    req.user = user;
    next();
  });
};
