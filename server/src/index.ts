import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import "express-async-errors";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

import { register } from "./controllers/auth-controller.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/auth-routes.js";
import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import { createPost } from "./controllers/post-controllers.js";
import { verifyToken } from "./middleware/authorization.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());
// app.use("/assets", express.static("public/assets"));
app.use(
  "/assets",
  express.static(path.join(__dirname, "../src/public/assets"))
);

app.use(express.static(path.join(__dirname, "./../../client/dist")));

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../src/public/assets"));
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/auth/register", upload.single("picture"), register);
app.post("/api/posts", verifyToken, upload.single("picture"), createPost);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./../../client/dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
