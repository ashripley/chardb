import styled from "styled-components"
import flame from "../../assets/flame.png"

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  background: white;
  height: 10%;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const StyledHeader = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
`

const MenuIcon = styled.div`
  display: flex;
  max-width: 100%;
  width: 8%;
  justify-content: center;
  align-items: inherit;
`

const HeaderText = styled.div`
  display: flex;
  font-size: 3rem;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
`

export const CollectionsHeader = () => {
  return (
    <>
      <Container>
        <StyledHeader style={{ display: "flex" }}>
          <MenuIcon>
            <img src={flame} alt="menu" style={{ width: 50, height: 50 }} />
          </MenuIcon>
          <HeaderText>
            <span
              className="char"
              style={{ color: "darkorange", fontWeight: 800 }}
            >
              char
            </span>
            <span className="db" style={{ color: "dimgray" }}>
              db
            </span>
          </HeaderText>
        </StyledHeader>
      </Container>
    </>
  )
}
