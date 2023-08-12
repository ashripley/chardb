import React from "react";
import styled from "styled-components";
import { Searchbar } from "./Searchbar";

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 80vh;
`;

export const Body = () => {
  return (
    <>
      <Container>
        <Searchbar />
      </Container>
    </>
  );
};
