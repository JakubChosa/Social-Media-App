import { useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type Props = {
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  addImage?: (image: Blob | null) => void;
};

const DropzoneContainer = ({ setFieldValue, addImage }: Props) => {
  const [fileName, setFileName] = useState("");

  const deletePicture = () => {
    setFieldValue?.("picture", "");
    addImage?.(null);
    setFileName("");
  };

  return (
    <Dropzone
      accept={{
        "image/png": [".png", ".jpg", ".jpeg"],
      }}
      multiple={false}
      onDrop={(acceptedFiles) => {
        setFileName(acceptedFiles[0].name);
        setFieldValue?.("picture", acceptedFiles[0]);
        addImage?.(acceptedFiles[0]);
      }}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <Wrapper>
            <div {...getRootProps()} className="image-container">
              <input {...getInputProps()} className="form-input" />
              {!fileName ? (
                <p className="form-input">Add Picture There</p>
              ) : (
                <p className="form-input flexBetween">{fileName}</p>
              )}
            </div>
            {fileName && (
              <div onClick={deletePicture} className="icon-container">
                <MdDelete className="icon" />
              </div>
            )}
          </Wrapper>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: flex;
  justify-content: space-between;
  margin-block: 1rem;
  .image-container {
    width: 100%;
    height: 70px;
    padding: 0.4rem;
    background: ${({ theme }) => theme.background};
    border-radius: 5px;
    display: flex;
    cursor: pointer;
  }
  .form-input {
    background: transparent;
    color: ${({ theme }) => theme.text};
    text-align: left;
    width: 100%;
    margin: 0 auto;
    padding-inline: 2rem;
    display: flex;
    align-items: center;
    border: 1px dashed ${({ theme }) => theme.primary.main};
    cursor: pointer;
    :active,
    :focus {
      outline: none;
    }
  }
  .icon-container {
    padding-inline: 1rem;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.text};
  }
  @media (min-width: 760px) {
    grid-column: span 2;
  }
`;
