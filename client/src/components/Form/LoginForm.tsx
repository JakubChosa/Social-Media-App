import FormInput from "@/components/Form/FormInput";
import styled from "styled-components";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "@/state/hooks";
import { setLogin } from "@/state/authSlice";
import { useNavigate } from "react-router-dom";
import { ILoginValues } from "./form.types";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

type Props = {};
const initialValues: ILoginValues = {
  email: "",
  password: "",
};

const LoginForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (
    values: ILoginValues,
    formikHelpers: FormikHelpers<ILoginValues>
  ) => {
    try {
      const loggedInResponse = await axios.post("/api/auth/login", values);
      const { userObject: user, token } = loggedInResponse.data;
      if (loggedInResponse) {
        dispatch(setLogin({ user, token }));
      }
      formikHelpers.resetForm();
      navigate("/");
    } catch (error) {}
  };
  const handleFormSubmit = async (
    values: ILoginValues,
    formikHelpers: FormikHelpers<ILoginValues>
  ) => {
    login(values, formikHelpers);
  };

  const loginAsTestUser = async () => {
    try {
      const loggedInResponse = await axios.post("/api/auth/login", {
        email: "uiTest@wp.pl",
        password: "testing",
      });
      const { userObject: user, token } = loggedInResponse.data;
      if (loggedInResponse) {
        dispatch(setLogin({ user, token }));
      }
      navigate("/");
    } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={loginSchema}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Wrapper onSubmit={handleSubmit}>
          <FormInput
            value={values.email}
            name="email"
            type="email"
            handleChange={handleChange}
            span2={true}
          />
          <FormInput
            value={values.password}
            name="password"
            type="password"
            handleChange={handleChange}
            span2={true}
          />
          <button type="submit" className="btn">
            Submit
          </button>
          <button className="btn" onClick={loginAsTestUser}>
            Login as test user
          </button>
        </Wrapper>
      )}
    </Formik>
  );
};

export default LoginForm;

const Wrapper = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
  column-gap: 1rem;
  button {
    width: 220px;
    margin-inline: auto;
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
  }

  @media (min-width: 760px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    button {
      grid-column: span 2;
    }
  }
`;
