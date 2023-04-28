import Wrapper from "./NavbarStyles";
import {
  MdOutlineSearch,
  MdMessage,
  MdNotifications,
  MdHelpCenter,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setMode, openMobileMenu } from "@/state/authSlice";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
import LoginButton from "./LoginButton";
import { useEffect } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isMobileOpen, mode } = useAppSelector((state) => state);
  const desktopScreen = useMediaQuery("(min-width: 760px)");

  useEffect(() => {
    if (desktopScreen && isMobileOpen) {
      dispatch(openMobileMenu());
    }
  }, [desktopScreen]);

  return (
    <Wrapper>
      {desktopScreen ? (
        <div className="container flexBetween">
          <div className="flexBetween">
            <h2 className="logo" onClick={() => navigate("/")}>
              FacePage
            </h2>
            <div className="search">
              <input type="text" placeholder="Search" className="input" />
              <MdOutlineSearch className="search-icon" />
            </div>
          </div>
          <nav className="flexBetween">
            {mode === "dark" ? (
              <FaMoon className="icon" onClick={() => dispatch(setMode())} />
            ) : (
              <FaSun className="icon" onClick={() => dispatch(setMode())} />
            )}
            <MdMessage className="icon" />
            <MdNotifications className="icon" />
            <MdHelpCenter className="icon" />
            <LoginButton />
          </nav>
        </div>
      ) : (
        <div className="container flexBetween">
          <div className="flexBetween">
            <h2 className="logo" onClick={() => navigate("/home")}>
              FacePage
            </h2>
          </div>
          <button className={`toggle-btn ${isMobileOpen ? "hidden" : ""}`}>
            <MdMenu onClick={() => dispatch(openMobileMenu())} />
          </button>
          {isMobileOpen ? (
            <div className="mobile">
              <button className="toggle-btn close-btn">
                <MdClose onClick={() => dispatch(openMobileMenu())} />
              </button>
              <div className="search">
                <input type="text" placeholder="Search" className="input" />
                <MdOutlineSearch className="search-icon" />
              </div>
              <div className="mobile-icons">
                <span onClick={() => dispatch(setMode())}>
                  <FaMoon className="icon" /> Theme
                </span>
                <span>
                  <MdMessage className="icon" /> Message
                </span>
                <span>
                  <MdNotifications className="icon" /> Notifications
                </span>
                <span>
                  <MdHelpCenter className="icon" /> HelpCenter
                </span>
              </div>
              <LoginButton />
            </div>
          ) : null}
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
