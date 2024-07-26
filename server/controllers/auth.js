import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

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
    if (isCorrect == false) return next(createError(400, "Wrong credentials!"));

    // if credentials are valid
    const { password, ...non_password_data } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(non_password_data);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({ ...req.body, fromGoogle: true });

      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_KEY);

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(saved._doc);
    }
  } catch (error) {
    next(error);
  }
};
