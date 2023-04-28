import { useEffect, useState } from "react";
import { useAppSelector } from "@/state/hooks";
import { useParams } from "react-router-dom";
import {
  AdvertWidget,
  PostsWidget,
  FriendListWidget,
  UserWidget,
  MyPostWidget,
} from "@/components/widgets";
import { IUser } from "@/state/auth.types";
import axios from "axios";
import styled from "styled-components";

type Props = {};

const ProfilePage = (props: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { userId } = useParams();
  const { token, user: loggedUser } = useAppSelector((state) => state);
  const loggedUserId = loggedUser?._id;
  const isItUserProfile = loggedUser?._id === userId;
  const getUser = async () => {
    const response = await axios(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { data } = await response;
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!user) return null;
  return (
    <Wrapper>
      <div className="container grid">
        <div>
          <UserWidget userId={userId} picturePath={user?.picturePath} />
        </div>
        <div className="posts">
          {userId === loggedUserId && <MyPostWidget />}
          <PostsWidget isProfile={true} userId={userId} />
        </div>
        <div className="posts">
          <AdvertWidget />
          {user && user.friends.length > 0 && (
            <FriendListWidget userId={user._id} isProfile={!isItUserProfile} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;

const Wrapper = styled.section`
  background: ${({ theme }) => theme.background};
  min-height: calc(100vh - var(--nav-height));
  padding-top: 1rem;
  transition: var(--transition);
  .grid {
    display: grid;
    gap: 2rem;
  }
  .posts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  @media (min-width: 760px) {
    .grid {
      grid-template-columns: 300px 1fr;
    }
  }
  @media (min-width: 1000px) {
    .grid {
      grid-template-columns: 25% 1fr 25%;
    }
  }
`;
