import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

type Props = {};

const SharedLayout = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
