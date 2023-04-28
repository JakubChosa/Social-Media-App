import { NotFoundError, BadRequestError } from "../types/custom-errors.js";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import User, { IUserDocument } from "../models/User.js";

const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("user with such id does not exist");
  }
  return res.status(StatusCodes.OK).json(user);
};

const getUserFriends: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new BadRequestError("user with such id does not exist");
  }
  if (user.friends.length === 0) {
    return res.status(StatusCodes.OK).json({ friends: [] });
  }
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends = friends.map((friend) => {
    const { firstName, lastName, _id, occupation, location, picturePath } =
      friend as IUserDocument;
    return {
      firstName,
      lastName,
      _id,
      occupation,
      location,
      picturePath,
    };
  });
  return res.status(StatusCodes.OK).json(formattedFriends);
};

const addRemoveFriend: RequestHandler = async (req, res) => {
  const { userId, friendId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("user with such id does not exist");
  }
  const friend = await User.findById(friendId);
  if (!friend) {
    throw new BadRequestError("friend with such id does not exist");
  }
  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }
  await user.save();
  await friend.save();

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends = friends.map((friend) => {
    const { firstName, lastName, _id, occupation, location, picturePath } =
      friend as IUserDocument;
    return {
      firstName,
      lastName,
      _id,
      occupation,
      location,
      picturePath,
    };
  });
  return res.status(StatusCodes.OK).json(formattedFriends);
};

export { getUser, getUserFriends, addRemoveFriend };
