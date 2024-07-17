import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createError } from "../error.js";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("Signup successful");
  } catch (error) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));
    let isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (isCorrect == false) {
      return next(createError(400, "Wrong credentials!"));
    }
    if (isCorrect) {
      console.log("password good");
    }
  } catch (error) {
    next(error);
  }
};
