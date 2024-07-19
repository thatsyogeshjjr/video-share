import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from "../controllers/video.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", verifyToken, getVideo);

export default router;
