import styled from "styled-components";
import { useAppSelector } from "@/state/hooks";

type Props = {
  image?: string;
  size?: string;
};

const UserImage = ({ image, size = "60px" }: Props) => {
  return (
    <Wrapper size={size}>
      {!image ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`/assets/default-avatar.png`}
        />
      ) : (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`/assets/${image}`}
        />
      )}
    </Wrapper>
  );
};

export default UserImage;

interface StyledProps {
  size: string;
}
const Wrapper = styled.div<StyledProps>``;
