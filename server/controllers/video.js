import { createError } from "../error.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVidoe = await newVideo.save();
    res.status(200).json(savedVidoe);
  } catch (error) {
    next(err);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      req.status(200).json(updateVideo);
    } else {
      next(createError(403, "Cannot update another user's video"));
    }
    res.status(200).json(savedVidoe);
  } catch (error) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      req.status(200).json("Video deleted.");
    } else {
      next(createError(403, "Cannot delete another user's video"));
    }
  } catch (error) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video Not Found"));
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
