import { createError } from "../error.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVidoe = await newVideo.save();
    res.status(200).json(savedVidoe);
  } catch (error) {
    next(error);
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

export const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id);
    if (!video) return next(createError(404, "Invalid Video"));
    Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    req.send(200).json("View Increased");
  } catch (error) {
    next(error);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).send(videos);
  } catch (error) {
    next(error);
  }
};

export const trendVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const subsVideos = async (req, res, next) => {
  try {
    const users = await User.findById(req.user.id);
    const subscribedChannels = User.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const tags = req.query.q;
  console.log(tags);
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
