import { Button, Grow, Slide } from "@mui/material"
import React from "react"
import styled from "styled-components"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import DeleteIcon from "@mui/icons-material/Delete"
import { editIconStyles, readIconStyles } from "../Views/List"
import { omit } from "../../helpers/omit"

interface Props {
  isCardHovered: boolean
  isEditView: boolean
  handleEdit: () => void
  handleSubmit: () => void
  handleDelete: () => void
  handleClear: () => void
}

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background: #0f1a1b;
  border-radius: 25px;
  transition: all 1s ease;
  margin-left: 10px;
`

export const ListActions = ({
  isCardHovered,
  isEditView,
  handleClear,
  handleDelete,
  handleEdit,
  handleSubmit,
}: Props) => {
  return (
    <Slide
      in={isCardHovered}
      direction="left"
      style={{ transformOrigin: "1 1 1" }}
      {...(true ? { timeout: 1000 } : {})}
    >
      <Wrapper>
        <Button
          sx={{ borderRadius: 50 }}
          onClick={() =>
            !isEditView ? handleEdit() : isEditView ? handleSubmit() : null
          }
        >
          {!isEditView ? (
            <EditIcon
              sx={{
                ...omit(["width", "height"], readIconStyles),
                width: 20,
                height: 20,
              }}
            />
          ) : (
            <DoneIcon
              sx={{
                ...omit(["width", "height"], editIconStyles),
                width: 20,
                height: 20,
              }}
            />
          )}
        </Button>
        <Button sx={{ borderRadius: 50 }}>
          {!isEditView ? (
            <DeleteIcon
              sx={{ ...editIconStyles }}
              onClick={() => handleDelete()}
            />
          ) : (
            <ClearIcon
              sx={{ ...editIconStyles }}
              onClick={() => handleClear()}
            />
          )}
        </Button>
      </Wrapper>
    </Slide>
  )
}
