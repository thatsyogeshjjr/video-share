import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import cookieParser from "cookie-parser";

dotenv.config();

const connect = () =>
  mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log(`Mongodb connection successful.`))
    .catch((err) => {
      console.log(`Mongodb connection failed.`);
      throw err;
    });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Started server on http://localhost:${PORT}`);
});
