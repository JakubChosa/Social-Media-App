import {
  MyPostWidget,
  AdvertWidget,
  PostsWidget,
  FriendListWidget,
  UserWidget,
} from "@/components/widgets";
import { useAppSelector } from "@/state/hooks";

type Props = {};

const HomePage = (props: Props) => {
  const { user } = useAppSelector((state) => state);
  return (
    <Wrapper>
      <div className="container grid">
        <div className="sticky">
          <UserWidget userId={user?._id} picturePath={user?.picturePath} />
        </div>
        <div className="posts">
          <MyPostWidget />
          <PostsWidget />
        </div>
        <div className="posts">
          <AdvertWidget />
          {user && user.friends.length > 0 && (
            <FriendListWidget userId={user._id} isProfile={false} />
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomePage;

import styled from "styled-components";

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
