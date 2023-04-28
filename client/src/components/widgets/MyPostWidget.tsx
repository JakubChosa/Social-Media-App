import styled from "styled-components";
import {
  MdOutlineAttachFile,
  MdOutlineGifBox,
  MdOutlineImage,
} from "react-icons/md";
import UserImage from "./UserImage";
import DropzoneContainer from "../Form/DropzoneContainer";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setPosts } from "@/state/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
type Image = Blob | null;

const MyPostWidget = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState<Image>(null);
  const [post, setPost] = useState("");
  const desktopScreen = useMediaQuery("(min-width: 760px)");

  const { token, user } = useAppSelector((state) => state);
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", user?._id as string);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    try {
      const response = await axios.post(`/api/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await response.data;
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {}
  };

  const addImage = (image: Image) => {
    setImage(image);
  };

  return (
    <Wrapper>
      <div className="flexBetween">
        <UserImage image={user?.picturePath} />
        <input
          placeholder="Share your thoughts..."
          type="text"
          name="post"
          value={post}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost(e.target.value)
          }
        />
      </div>
      <DropzoneContainer addImage={addImage} />
      <hr className="divider" />
      <div className="file flexBetween">
        <div className="file-type flexBetween">
          <MdOutlineImage /> Image
        </div>
        {desktopScreen && (
          <>
            <div className="file-type flexBetween">
              <MdOutlineGifBox /> Clip
            </div>
            <div className="file-type flexBetween">
              <MdOutlineAttachFile /> Attachment
            </div>
          </>
        )}
        {user ? (
          <button className="btn" onClick={handlePost}>
            Post
          </button>
        ) : (
          <button className="btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default MyPostWidget;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 10px;
  input {
    height: 45px;
    width: 100%;
    margin-left: 1rem;
    padding: 0.75rem;
    border-radius: 5px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid var(--grey-200);
  }

  .delete-btn {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.neutral.light};
    font-size: 32px;
    padding: 0.2rem;
    border-radius: 5px;
    cursor: pointer;
    :hover {
      background: ${({ theme }) => theme.primary.dark};
    }
  }
  .divider {
    background-color: ${({ theme }) => theme.text};
    opacity: 0.1;
    width: 100%;
    margin-block: 0;
  }
  .file {
    margin-top: 0.5rem;
    button {
      background: ${({ theme }) => theme.primary.main};
      color: ${({ theme }) => theme.neutral.light};
      margin-left: auto;
      :hover {
        background: ${({ theme }) => theme.primary.dark};
      }
    }
  }
  .file-type {
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
    gap: 0.2rem;
  }
  @media (min-width: 760px) {
    .file {
      button {
        margin-left: 0;
      }
    }
  }
`;
