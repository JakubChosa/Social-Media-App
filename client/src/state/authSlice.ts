import {
  IUser,
  InitialAuthState,
  IUserFriend,
  IPost,
} from "@/state/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialAuthState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  profileFriends: [],
  isMobileOpen: false,
};

// DO THIS !!!
// check what object you gonna get from backend and then use PayloadAction

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    openMobileMenu: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },
    setLogin: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: IUserFriend[] }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends: 0");
      }
    },
    setProfileFriends: (state, action: PayloadAction<IUserFriend[]>) => {
      state.profileFriends = action.payload;
    },
    setPosts: (state, action: PayloadAction<{ posts: IPost[] }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: IPost }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setFriends,
  setLogout,
  setPost,
  setPosts,
  openMobileMenu,
  setProfileFriends,
} = authSlice.actions;
export default authSlice.reducer;
