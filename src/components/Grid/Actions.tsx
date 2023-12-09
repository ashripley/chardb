import ClearIcon from "@mui/icons-material/Clear"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import EditIcon from "@mui/icons-material/Edit"
import { Button, Grow } from "@mui/material"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { editIconStyles, readIconStyles } from "../Views/List"

interface Props {
  isCardHovered: boolean
  isEditView: boolean
  handleEdit: () => void
  handleSubmit: () => void
  handleDelete: () => void
  handleClear: () => void
}

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Theme.card};
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
      <Wrapper>
        <Button
          sx={{ borderRadius: 50 }}
          onClick={() =>
            !isEditView ? handleEdit() : isEditView ? handleSubmit() : null
          }
        >
          {!isEditView ? (
            <EditIcon sx={{ ...readIconStyles }} />
          ) : (
            <DoneIcon sx={{ ...readIconStyles }} />
          )}
        </Button>
        <Button sx={{ borderRadius: 50 }}>
          {!isEditView ? (
            <DeleteIcon sx={{ ...editIconStyles }} onClick={handleDelete} />
          ) : (
            <ClearIcon sx={{ ...editIconStyles }} onClick={handleClear} />
          )}
        </Button>
      </Wrapper>
    </Grow>
  )
}
