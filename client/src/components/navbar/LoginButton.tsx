import { FaCaretDown } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { setLogout } from "@/state/authSlice";
import { useNavigate } from "react-router-dom";
type Props = {};

const LoginButton = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";
  const ref = useRef(null);
  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };

  const handleClickOutside = () => {
    setShowLogout(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const logMeOut = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="btn-container" ref={ref}>
      <button type="button" className="btn" onClick={toggleLogout}>
        <span className="show-text">{fullName}</span>
        <FaCaretDown />
      </button>
      <div className={showLogout ? `dropdown show-dropdown` : "dropdown"}>
        <button type="button" className="dropdown-btn">
          {user ? (
            <span onClick={logMeOut}>Logout</span>
          ) : (
            <Link to="/login" className="login-btn">
              {user ? "logout" : "Login"}
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginButton;
