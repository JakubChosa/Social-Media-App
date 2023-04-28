import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  nav {
    width: 100%;
    height: var(--nav-height);
    display: grid;
    place-items: center;
    background: ${({ theme }) => theme.neutral.light};
  }
  .logo {
    font-size: clamp(1rem, 1.4rem, 1.6rem);
    font-weight: bolder;
    margin: 0 auto;
    color: ${({ theme }) => theme.primary.main};
    transition: var(--transition);
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.primary.dark};
    }
  }
  .grid {
    min-height: 100%;
    display: grid;
    justify-items: center;
    align-items: start;
    margin-top: 2rem;
    padding-inline: 1rem;
    > * {
      background: ${({ theme }) => theme.neutral.light};
    }
  }
  .return-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.6rem;
    font-weight: bolder;
    color: var(--black);
    background: transparent;
    cursor: pointer;
  }
  .return-btn:hover {
    scale: 1.1;
  }
  h3 {
    text-align: center;
    color: ${({ theme }) => theme.text};
  }
  p {
    margin: 0 auto;
    margin-top: 1rem;
    text-align: center;
    color: ${({ theme }) => theme.text};
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--grey-600);
    cursor: pointer;
    letter-spacing: 1px;
  }
  @media (min-width: 700px) {
    .grid {
      margin-top: 4rem;
    }
  }
`;
export default Wrapper;
