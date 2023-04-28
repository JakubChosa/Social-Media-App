import styled from "styled-components";

type Props = {};

const AdvertWidget = (props: Props) => {
  return (
    <Wrapper>
      <div className="flexBetween">
        <p className="ad">Sponsored</p>
        <p className="ad">Create Ad</p>
      </div>
      <img src={"/assets/info3.jpeg"} alt="ad" className="image" />
      <div className="flexBetween">
        <p className="article-title">Beauty</p>
        <p className="website">Cosmetics.com</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quia
        quam ea?
      </p>
    </Wrapper>
  );
};

export default AdvertWidget;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 10px;
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    margin-block: 0.3rem;
  }
  .article-title,
  .ad {
    font-weight: 500;
    opacity: 0.9;
  }
  .website {
    cursor: pointer;
  }
  .article-title {
    font-size: 1.1rem;
  }
  .image {
    width: 100%;
    height: auto;
  }
`;
