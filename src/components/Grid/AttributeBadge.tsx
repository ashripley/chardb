import { Badge, Tooltip } from "@mui/material"
import styled from "styled-components"
import { theme } from "../../theme"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"

interface Props {
  isEvolutionsHovered: boolean
  pokemon: Record<string, any>
  isGridCard: boolean
}

const Wrapper = styled.div<{ isGridCard: boolean }>`
  display: flex;
  height: 100%;
  padding-bottom: ${({ isGridCard }) => (isGridCard ? "20px" : "30px")};
  align-items: center;
  margin-right: 35px;
  width: 35px;
  justify-content: space-between;
`

const StyledBadge = styled(Badge)`
  display: flex;
  height: 100%;
  width: 10px;
  position: relative;
  top: 95%;
  align-items: flex-start;
`

const Quantity = styled.div<{ isGridCard: boolean }>`
  color: ${theme.lightBg};
  align-items: flex-start;
  display: flex;
  height: 100%;
  width: 10px;
  position: relative;
  top: ${({ isGridCard }) => (isGridCard ? "91%" : "87%")};
  font-weight: 300 !important;
  font-family: ${theme.fontFamily};
`

export const AttributeBadge = ({
  pokemon,
  isEvolutionsHovered,
  isGridCard,
}: Props) => {
  return (
    <Wrapper isGridCard={isGridCard}>
      <Tooltip title={upperCaseFirst(pokemon.attribute)} placement="top">
        <StyledBadge
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              color: isEvolutionsHovered
                ? theme.lightBg
                : theme.attributeColour[pokemon.attribute] ?? theme.lightBg,
              backgroundColor: isEvolutionsHovered
                ? theme.lightBg
                : theme.attributeColour[pokemon.attribute] ?? theme.lightBg,
            },
          }}
        />
      </Tooltip>
      <Quantity isGridCard={isGridCard}>{pokemon.quantity}</Quantity>
    </Wrapper>
  )
}
