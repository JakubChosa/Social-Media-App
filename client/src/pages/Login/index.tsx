import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./LoginStyles";
import LoginForm from "@/components/Form/LoginForm";
import RegisterForm from "@/components/Form/RegisterForm";
import { useAppSelector } from "@/state/hooks";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state);
  const [formType, setFormType] = useState<"login" | "register">("login");

  const changeFormType = useCallback(() => {
    setFormType((prevState) => (prevState === "login" ? "register" : "login"));
  }, [formType]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Wrapper>
      <nav>
        <h2 className="logo" onClick={() => navigate("/")}>
          FacePage
        </h2>
      </nav>
      <div className="grid">
        <div className="form">
          <h3>{formType === "login" ? "Login" : "Register"}</h3>
          {formType === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm changeFormType={changeFormType} />
          )}
          <p>
            {formType === "login" ? "Not a member yet?" : "Already a member?"}
            <button
              type="button"
              className="member-btn"
              onClick={changeFormType}
            >
              {formType === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
