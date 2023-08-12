import React from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Body } from "./Body";

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100vh;
  width: 100%;
  background: cornsilk;
`;

export const Desktop = () => {
  return (
    <>
      <Container>
        <Header />
        <Body />
      </Container>
    </>
  );
};
