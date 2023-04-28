import FormInput from "@/components/Form/FormInput";
import styled from "styled-components";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import DropzoneContainer from "./DropzoneContainer";
import axios from "axios";
import { IRegisterValues } from "./form.types";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  picturePath: yup.string(),
  location: yup.string(),
  occupation: yup.string(),
});

type Props = { changeFormType: () => void };

const initialValues: IRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  picture: "",
  location: "",
  occupation: "",
};

const RegisterForm = ({ changeFormType }: Props) => {
  const register = async (
    values: IRegisterValues,
    formikHelpers: FormikHelpers<IRegisterValues>
  ) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        if (value) {
          formData.append(value, values[value as keyof typeof values]);
        }
      }
      if (values.picture instanceof Blob) {
        formData.append("picturePath", values.picture.name);
      }
      const savedUser = await axios.post("/api/auth/register", formData);

      formikHelpers.resetForm();
      changeFormType();
    } catch (error) {}
  };

  const handleFormSubmit = async (
    values: IRegisterValues,
    formikHelpers: FormikHelpers<IRegisterValues>
  ) => {
    register(values, formikHelpers);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={registerSchema}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <Wrapper onSubmit={handleSubmit}>
          <FormInput
            value={values.firstName}
            name="firstName"
            type="text"
            handleChange={handleChange}
          />
          <FormInput
            value={values.lastName}
            name="lastName"
            type="text"
            handleChange={handleChange}
          />
          <FormInput
            value={values.location}
            name="location"
            type="text"
            handleChange={handleChange}
          />
          <FormInput
            value={values.occupation}
            name="occupation"
            type="text"
            handleChange={handleChange}
          />
          <DropzoneContainer setFieldValue={setFieldValue} />
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
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </Wrapper>
      )}
    </Formik>
  );
};

export default RegisterForm;

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
