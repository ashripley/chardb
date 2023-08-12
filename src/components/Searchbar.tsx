import { Button, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: 20px;
  display: flex;
  justify-content: center;
`;

const Fields = styled.div`
  display: block;
  max-width: 100%;
  width: 100%;
`;

const NameField = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

// const TypeField = styled(NameField)``;

export const Searchbar = () => {
  return (
    <Wrapper>
      <Fields>
        <NameField>
          <TextField
            id="standard"
            label="Pokémon Name"
            variant="outlined"
            style={{ width: "30%", paddingRight: 20 }}
            color="warning"
          />
          <Button
            variant="outlined"
            size="small"
            color="warning"
            style={{ width: "5%" }}
          >
            Search
          </Button>
        </NameField>
      </Fields>
    </Wrapper>
  );
};
