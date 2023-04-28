import { Router } from "express";
import { verifyToken } from "../middleware/authorization.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user-controller.js";
const router = Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);

export default router;
