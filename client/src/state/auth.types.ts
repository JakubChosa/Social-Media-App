export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: IUserFriend[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IUserFriend {
  _id: string;
  firstName: string;
  lastName: string;
  picturePath: string;
  location: string;
  occupation: string;
}

export interface IPost {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: { [key: string]: boolean };
  comments: string[];
}

export type InitialAuthState = {
  mode: "light" | "dark";
  user: IUser | null;
  token: string | null;
  posts: IPost[];
  profileFriends: IUserFriend[];
  isMobileOpen: boolean;
};
