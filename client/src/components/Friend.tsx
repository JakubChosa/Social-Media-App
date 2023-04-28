import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useNavigate } from "react-router-dom";
import { setFriends } from "@/state/authSlice";
import axios from "axios";
import styled from "styled-components";
import { UserImage } from "./widgets";

type Props = {
  friendId: string;
  name: string;
  location: string;
  userPicturePath: string;
  isProfile?: boolean;
};

const Friend = ({
  friendId,
  name,
  location,
  userPicturePath,
  isProfile = false,
}: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state);
  const userId = user?._id;
  let isFriend;
  if (user) {
    isFriend = user.friends.find((friend) => friend._id === friendId);
  }
  const addIcon = friendId === userId || isProfile;
  const patchFriend = async () => {
    try {
      const response = await axios.patch(
        `/api/users/${userId}/${friendId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = await response;
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfileLink = () => {
    if (token) {
      navigate(`/profile/${friendId}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <Wrapper>
      <div className="flexBetween user" onClick={handleProfileLink}>
        <UserImage image={userPicturePath} size="50px" />
        <div>
          <p className="user-name">{name}</p>
          <p className="user-location">{location}</p>
        </div>
      </div>

      {user && !addIcon && (
        <div>
          {!isFriend ? (
            <MdPersonAddAlt1 onClick={patchFriend} className="icon" />
          ) : (
            <MdPersonRemoveAlt1 onClick={patchFriend} className="icon" />
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Friend;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.primary.dark};
  }
  .user {
    gap: 1rem;
    cursor: pointer;
  }
  .user-name {
    font-size: 1.1rem;
    opacity: 1;
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .user-location {
    margin-top: 0;
  }
  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.primary.dark};
    }
  }
`;
