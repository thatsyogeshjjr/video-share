import express from "express";
import {
  dislike,
  like,
  remove,
  subscribe,
  unsubscibe,
  update,
  getUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);
router.get("/find/:id", getUser);
router.get("/sub/:id", verifyToken, subscribe);
router.put("/unsub/:id", verifyToken, unsubscibe);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
