import styled from "styled-components";

const Wrapper = styled.header`
  height: var(--nav-height);
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.text};
  z-index: 20;
  .logo {
    font-size: clamp(1rem, 1.4rem, 1.6rem);
    font-weight: bolder;
    margin: 0;
    color: ${({ theme }) => theme.primary.main};
    transition: var(--transition);
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.primary.dark};
    }
  }
  .search {
    position: relative;
  }
  .search-icon {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0px, -50%);
  }
  .input {
    width: 100%;
    max-width: 300px;
    padding: 0.375rem 0.75rem;
    border-radius: 5px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: none;
  }
  nav {
    gap: 0.5rem;
  }
  .btn-container {
    position: relative;
    min-width: 160px;
    border-radius: 5px;
    button {
      width: 100%;
    }
  }
  .icon {
    color: ${({ theme }) => theme.text};
    font-size: 26px;
    padding: 0.2rem;
    transition: var(--transition);
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.neutral.dark};
    }
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.neutral.light};
    :hover {
      background: ${({ theme }) => theme.neutral.dark};
    }
  }
  .toggle-btn {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    border: none;
    cursor: pointer;
    background: none;
    border-radius: 10px;
    transition: var(--transition);
    :hover {
      background: ${({ theme }) => theme.neutral.light};
    }
  }
  .close-btn {
    position: absolute;
    right: 10px;
    top: 20px;
  }
  .hidden {
    display: none;
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 50%;
    translate: -50% 0;
    z-index: 20;
    width: 130px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: 5px;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: ${({ theme }) => theme.text};
    text-transform: capitalize;
    cursor: pointer;
    text-decoration: none;
  }
  .login-btn {
    color: ${({ theme }) => theme.text};
  }
  .mobile {
    background: ${({ theme }) => theme.neutral.light};
    position: absolute;
    right: 0px;
    top: 0;
    height: 100vh;
    z-index: 20;
    padding-top: 4rem;
    width: 100%;
    max-width: 400px;
    display: grid;
    place-content: start center;
    gap: 1rem;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  }
  .mobile-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    span {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
    }
  }
  @media (min-width: 900px) {
    position: sticky;
    top: 0;
    .logo {
      margin-right: 2rem;
    }
  }
`;
export default Wrapper;
