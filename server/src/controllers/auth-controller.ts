import { BadRequestError } from "../types/custom-errors.js";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import User, { IUserDocument } from "../models/User.js";

const register: RequestHandler = async (req, res) => {
  const {
    password,
    firstName,
    lastName,
    picturePath,
    email,
    location,
    occupation,
    //friends
  } = req.body;

  const user: IUserDocument = new User({
    password,
    firstName,
    lastName,
    picturePath,
    email,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });
  const savedUser = await user.save();

  let userObject = savedUser.toObject();
  delete userObject.password;
  return res.status(StatusCodes.CREATED).json(userObject);
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password -__v");
  if (!user) {
    throw new BadRequestError("user with provided email does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("provided password is wrong");
  }
  const token = user.createJWT();

  let userObject = user.toObject() as any;
  delete userObject.password;

  return res.status(StatusCodes.CREATED).json({ userObject, token });
};

export { register, login };
