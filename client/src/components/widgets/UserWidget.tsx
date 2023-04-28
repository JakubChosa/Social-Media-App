import {
  MdOutlineManageAccounts,
  MdModeEditOutline,
  MdLocationOn,
  MdWork,
} from "react-icons/md";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { UserImage } from "./index";
import { useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import { IUser } from "@/state/auth.types";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = { userId?: string; picturePath?: string };

const UserWidget = ({ userId, picturePath }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const { token, user: loggedUser } = useAppSelector((state) => state);
  if (loggedUser && user && userId === loggedUser._id) {
    user.friends = loggedUser.friends;
  }
  const getUser = async () => {
    try {
      const response = await axios(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = response;
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <div className="flexBetween">
        <UserImage image={picturePath} />
        <div onClick={() => navigate(`/profile/${userId}`)}>
          <p className="user-name">
            {user ? `${user.firstName} ${user.lastName}` : "User"}
          </p>
          <p>
            {user ? `${user.friends.length}` : "0"}
            {user?.friends.length === 1 ? " friend" : " friends"}
          </p>
        </div>
        <MdOutlineManageAccounts className="icon" />
      </div>
      <hr className="divider" />
      <div>
        <p className="work-info">
          <MdLocationOn className="icon margin-right" />
          {user ? `${user.location}` : "none"}
        </p>
        <p className="work-info">
          <MdWork className="icon margin-right" />
          {user ? `${user.occupation}` : "none"}
        </p>
      </div>
      <div>
        <p className="views-info flexBetween">
          Who's viewed your profile
          <span>{user ? `${user.viewedProfile}` : "0"}</span>
        </p>
        <p className="views-info flexBetween">
          Impressions of your posts
          <span>{user ? `${user.impressions}` : "0"}</span>
        </p>
      </div>
      <div className="socials">
        <p className="socials-title">Social Profiles</p>
        <div className="socials-link flexBetween">
          <div className="flexBetween">
            <AiOutlineTwitter className="icon margin-right" />
            <div>
              <p className="socials-name">Twitter</p>
              <p className="socials-subname">Social Network</p>
            </div>
          </div>
          <MdModeEditOutline className="icon" />
        </div>
        <div className="socials-link flexBetween">
          <div className="flexBetween">
            <AiFillLinkedin className="icon margin-right" />
            <div>
              <p className="socials-name">Linkedin</p>
              <p className="socials-subname">Network Platform</p>
            </div>
          </div>
          <MdModeEditOutline className="icon " />
        </div>
      </div>
    </Wrapper>
  );
};

export default UserWidget;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 10px;
  position: sticky;
  top: calc(0px + var(--nav-height) + 1rem);
  p {
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
  .margin-right {
    margin-right: 1rem;
  }
  .divider {
    background-color: ${({ theme }) => theme.text};
    opacity: 0.1;
    width: 100%;
    margin-block: 0;
  }
  .user-name {
    font-size: 1.1rem;
    opacity: 1;
    font-weight: 500;
    cursor: pointer;
  }
  .work-info {
    display: flex;
    align-items: center;
  }
  .work-icon {
    margin-right: 1rem;
  }
  .views-info {
  }
  .socials {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .socials-title {
    font-size: 1rem;
    opacity: 1;
    font-weight: 500;
  }
  .socials-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .socials-name,
  .socials-subname {
    margin-block: 0.3rem;
  }
`;
