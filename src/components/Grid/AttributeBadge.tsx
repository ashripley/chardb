import { Badge, Tooltip } from "@mui/material"
import styled from "styled-components"
import { Theme } from "../../Theme"
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
  color: ${Theme.lightBg};
  align-items: flex-start;
  display: flex;
  height: 100%;
  width: 10px;
  position: relative;
  top: ${({ isGridCard }) => (isGridCard ? "91%" : "87%")};
  font-weight: 300 !important;
  font-family: ${Theme.fontFamily};
`

export const AttributeBadge = ({
  pokemon,
  isEvolutionsHovered,
  isGridCard,
}: Props) => {
  const attributeColour: Record<string, any> = {
    standard: Theme.primaryText,
    "standard holographic": Theme.standardHolographic,
    "reverse holographic": Theme.reverseHolographic,
    special: Theme.special,
    gold: Theme.gold,
  }

  return (
    <Wrapper isGridCard={isGridCard}>
      <Tooltip title={upperCaseFirst(pokemon.attribute)} placement="top">
        <StyledBadge
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              color: isEvolutionsHovered
                ? Theme.lightBg
                : attributeColour[pokemon.attribute] ?? "#c0c0c0",
              backgroundColor: isEvolutionsHovered
                ? Theme.lightBg
                : attributeColour[pokemon.attribute] ?? "#c0c0c0",
            },
          }}
        />
      </Tooltip>
      <Quantity isGridCard={isGridCard}>{pokemon.quantity}</Quantity>
    </Wrapper>
  )
}
