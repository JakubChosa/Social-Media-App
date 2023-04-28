import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setPost } from "@/state/authSlice";
import { IPost } from "@/state/auth.types";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import Friend from "../Friend";
import axios from "axios";

const PostWidget = ({
  _id: postId,
  userId: postUserId,
  firstName,
  lastName,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}: IPost) => {
  const [openComments, setOpenComments] = useState(false);
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state);
  const loggedInUserId = user?._id;
  const userName = `${firstName} ${lastName}`;
  let isLiked = false;
  if (loggedInUserId) {
    isLiked = Boolean(likes[loggedInUserId]);
  }
  const likeCount = Object.keys(likes).length;
  const patchLike = async () => {
    try {
      const response = await axios.patch(
        `/api/posts/${postId}/like`,
        { userId: loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPost = await response.data;
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <Friend
        name={userName}
        friendId={postUserId}
        userPicturePath={userPicturePath}
        location={location}
      />
      <div className="description">{description}</div>
      {picturePath && (
        <img alt="post" src={`/assets/${picturePath}`} className="image" />
      )}
      <div className="flexBetween">
        <div className="flexBetween engagement">
          <div className="count flexBetween">
            {isLiked ? (
              <AiFillHeart className="icon" onClick={patchLike} />
            ) : (
              <AiOutlineHeart className="icon" onClick={patchLike} />
            )}
            {likeCount}
          </div>
          <div className="count flexBetween">
            <IoChatboxEllipsesOutline
              className="icon"
              onClick={() => setOpenComments((prevState) => !prevState)}
            />
            {comments.length}
          </div>
        </div>
        <AiOutlineShareAlt className="icon" />
      </div>
      {openComments && (
        <div className="comments-container">
          {comments.map((comment, i) => (
            <div className="comment" key={i}>
              {comment}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default PostWidget;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 10px;
  p,
  .description {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
    margin-block: 0.7rem;
  }
  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    :hover {
      cursor: pointer;
    }
  }
  .user-name {
    font-size: 1.1rem;
    opacity: 1;
    font-weight: 500;
  }
  .image {
    width: 100%;
    height: auto;
  }
  .count {
    color: ${({ theme }) => theme.text};
    gap: 0.5rem;
  }
  .engagement {
    margin-top: 0.5rem;
    width: 120px;
  }
  .comments-container {
    background: ${({ theme }) => theme.neutral.light};
    padding: 0.5rem;
    .comment {
      padding-block: 0.6rem;

      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .divider {
    background-color: ${({ theme }) => theme.text};
    opacity: 0.1;
    width: 100%;
    margin-block: 0;
  }
`;
