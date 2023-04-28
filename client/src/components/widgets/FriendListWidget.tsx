import Friend from "../Friend";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setFriends, setProfileFriends } from "@/state/authSlice";
import axios from "axios";
import styled from "styled-components";

type Props = {
  userId: string;
  isProfile: boolean;
};

const FriendListWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useAppDispatch();
  const { token, user, profileFriends } = useAppSelector((state) => state);
  const friends = user?.friends;

  const getUserFriends = async () => {
    const response = await axios(`/api/users/${user?._id}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await response;
    dispatch(setFriends({ friends: data }));
  };

  const getProfileFriends = async () => {
    const response = await axios(`/api/users/${userId}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await response;
    dispatch(setProfileFriends(data));
  };

  useEffect(() => {
    if (isProfile) {
      getProfileFriends();
    } else {
      getUserFriends();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Wrapper>
      <p className="article-title">Friends</p>
      <div className="friends-container">
        {isProfile && profileFriends.length > 0
          ? profileFriends.map((friend, i) => {
              return (
                <Friend
                  key={`${friend._id}-${i}`}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  location={friend.location}
                  userPicturePath={friend.picturePath}
                  isProfile={true}
                />
              );
            })
          : friends?.map((friend, i) => {
              return (
                <Friend
                  key={`${friend._id}-${i}`}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  location={friend.location}
                  userPicturePath={friend.picturePath}
                />
              );
            })}
      </div>
    </Wrapper>
  );
};

export default FriendListWidget;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 10px;
  .article-title {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
    margin-block: 0.3rem;
  }
`;
