import { Button, Grow } from "@mui/material"
import React from "react"
import styled from "styled-components"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import DoneIcon from "@mui/icons-material/Done"
import DeleteIcon from "@mui/icons-material/Delete"
import { editIconProps, readIconProps } from "../Views/List"

interface Props {
  isCardHovered: boolean
  isEditView: boolean
  handleEdit: () => void
  handleSubmit: () => void
  handleDelete: () => void
  handleClear: () => void
}

const ActionRow = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333333;
  border-radius: 30px;
  transition: all 1s ease;
`

export const Actions = ({
  isCardHovered,
  isEditView,
  handleClear,
  handleDelete,
  handleEdit,
  handleSubmit,
}: Props) => {
  return (
    <Grow
      in={isCardHovered}
      style={{ transformOrigin: "1 1 1" }}
      {...(true ? { timeout: 1000 } : {})}
    >
      <ActionRow>
        <Button
          sx={{ borderRadius: 50 }}
          onClick={() =>
            !isEditView ? handleEdit() : isEditView ? handleSubmit() : null
          }
        >
          {!isEditView ? (
            <EditIcon sx={{ ...readIconProps }} />
          ) : (
            <DoneIcon sx={{ ...readIconProps }} />
          )}
        </Button>
        <Button sx={{ borderRadius: 50 }}>
          {!isEditView ? (
            <DeleteIcon
              sx={{ ...editIconProps }}
              onClick={() => handleDelete()}
            />
          ) : (
            <ClearIcon
              sx={{ ...editIconProps }}
              onClick={() => handleClear()}
            />
          )}
        </Button>
      </ActionRow>
    </Grow>
  )
}
