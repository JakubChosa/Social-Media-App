import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setPosts } from "@/state/authSlice";
import axios from "axios";
import PostWidget from "./PostWidget";

type Props = {
  userId?: string;
  isProfile?: boolean;
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useAppDispatch();
  const { token, posts } = useAppSelector((state) => state);
  const getPosts = async () => {
    try {
      const response = await axios("/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = await response;
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios(`/api/posts/${userId}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response;
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]);
  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} {...post} />
      ))}
    </>
  );
};

export default PostsWidget;
