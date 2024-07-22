import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(err);
    }
  } else {
    return next(
      createError(403, "Updation is available for your own account only")
    );
  }
};

export const remove = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(`User ${req.params.id} was deleted`);
    } catch (err) {
      next(createError(403, "Only personal accounts can be deleted"));
    }
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.params.id);
    res.status(200).json(user);
    res.send(user);
  } catch (error) {
    next(createError(500, err));
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await user.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful");
  } catch (error) {
    next(error);
  }
};

export const unsubscibe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await user.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successful");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      // addToSet will not add in the value if it already exists in the array
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video Liked");
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      // addToSet will not add in the value if it already exists in the array
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("Video Liked");
  } catch (error) {
    next(error);
  }
};
