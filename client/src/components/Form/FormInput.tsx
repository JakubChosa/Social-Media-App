import styled from "styled-components";

type Props = {
  type: string;
  value: string;
  name: string;
  labelText?: string;
  span2?: boolean;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

const FormInput = ({
  type,
  value,
  name,
  labelText,
  handleChange,
  span2 = false,
}: Props) => {
  return (
    <Wrapper span2={span2}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </Wrapper>
  );
};
export default FormInput;

const Wrapper = styled.div<{
  span2?: boolean;
}>`
  .form-label {
    display: block;
    margin-block: 0.5rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text};
  }
  .form-input,
  .form-textarea,
  .form-select {
    height: 35px;
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 5px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    border: 1px solid var(--grey-200);
  }
  @media (min-width: 760px) {
    grid-column: ${({ span2 }) => (span2 ? "span 2" : "span 1")};
  }
`;
