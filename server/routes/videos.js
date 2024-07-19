import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getVideo,
  subsVideos,
  trendVideos,
  updateVideo,
} from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", verifyToken, getVideo);
router.put("/view/:id", addView);
router.get("/sub/", verifyToken, subsVideos);
router.get("/trend/", trendVideos);

export default router;
