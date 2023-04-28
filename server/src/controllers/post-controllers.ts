import { BadRequestError } from "../types/custom-errors.js";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Post, { IPostDocument } from "../models/Post.js";
import User from "../models/User.js";

const createPost: RequestHandler = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("user with provided email does not exist");
  }

  const newPost: IPostDocument = new Post({
    userId: user._id,
    lastName: user.lastName,
    firstName: user.firstName,
    description,
    location: user.location,
    userPicturePath: user.picturePath,
    likes: {},
  });
  if (picturePath) {
    newPost.picturePath = picturePath;
  }

  await newPost.save();
  const posts = await Post.find()
    .select("-createdAt -updatedAt")
    .sort("-createdAt");
  return res.status(StatusCodes.OK).json(posts);
};

const getFeedPosts: RequestHandler = async (req, res) => {
  const posts = await Post.find()
    .select("-createdAt -updatedAt")
    .sort("-createdAt");
  return res.status(StatusCodes.OK).json(posts);
};

const getUserPosts: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ userId })
    .select("-createdAt -updatedAt")
    .sort("-createdAt");
  return res.status(StatusCodes.OK).json(posts);
};

const likePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id).select("-createdAt -updatedAt");
  if (!post) {
    throw new BadRequestError("post does not exist");
  }
  const isLiked = post?.likes.get(userId);
  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  )
    .select("-createdAt -updatedAt")
    .sort("-createdAt");
  return res.status(StatusCodes.OK).json(updatedPost);
};

export { createPost, getFeedPosts, getUserPosts, likePost };
