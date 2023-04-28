import bcrypt from "bcryptjs";
import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): Promise<boolean>;
}

export interface IUserDocument extends Document, IUser {}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false,
    },
    picturePath: {
      type: String,
      default: "default-avatar.png",
    },
    friends: {
      type: [],
      default: [String],
    },
    location: { type: String, default: "unknown" },
    occupation: { type: String, default: "unknown" },
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserDocument;

  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  const user = this as IUserDocument;
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.pre<IUserDocument>("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(user.password, salt);

  // Replace the password with the hash
  user.password = passwordHash;
  return next();
});

export default mongoose.model<IUserDocument>("User", UserSchema);
