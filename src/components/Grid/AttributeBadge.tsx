import { Badge } from "@mui/material"
import React from "react"
import styled from "styled-components"
import { Theme } from "../../Theme"
import { attributeColour } from "../helpers"

interface Props {
  isEvolutionsHovered: boolean
  pokemon: Record<string, any>
}

const StyledBadge = styled(Badge)`
  display: flex;
  height: 100%;
  position: relative;
  top: 91%;
  margin-right: 20px;
  padding-right: 15px;
`

export const AttributeBadge = ({ pokemon, isEvolutionsHovered }: Props) => {
  return (
    <StyledBadge
      variant="dot"
      sx={{
        "& .MuiBadge-badge": {
          color: isEvolutionsHovered
            ? Theme.lightBg
            : attributeColour[pokemon.attribute],
          backgroundColor: isEvolutionsHovered
            ? Theme.lightBg
            : attributeColour[pokemon.attribute],
        },
      }}
    />
  )
}
