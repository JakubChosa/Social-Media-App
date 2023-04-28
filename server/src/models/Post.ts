import mongoose, { Document } from "mongoose";

export interface IPost {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string | null;
  userPicturePath: string;
  likes: Map<mongoose.Types.ObjectId, boolean>;
  comments: string[];
}

export interface IPostDocument extends Document, IPost {}

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: { type: String, required: true },
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPostDocument>("Post", PostSchema);
