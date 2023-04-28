import { Router } from "express";
import { verifyToken } from "../middleware/authorization.js";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post-controllers.js";
const router = Router();

router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;
