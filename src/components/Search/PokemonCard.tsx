import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined"
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined"
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone"
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined"
import TagIcon from "@mui/icons-material/Tag"

interface Props {
  query: Record<string, any>
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  background: white !important;
`

const StyledPaper = styled(Paper)`
  background-color: white;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: center;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
`

const CardWrapper = styled.div`
  width: 20%;
  padding: 20px 30px;
  height: 500px;
`

const Image = styled.div`
  background: #0f1a1b;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`

const Details = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-wrap: wrap;
`

const Row = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PokemonCard = (props: Props) => {
  const [edit, setEdit] = useState(false)

  const iconTypes = {
    water: "primary",
    fire: "warning",
    grass: "success",
    normal: "action",
    psychic: "secondary",
  }

  return (
    <Container>
      <StyledPaper
        elevation={0}
        style={{ backgroundColor: "white", maxWidth: "100%" }}
      >
        {props.query.map((query: Record<string, any>) => (
          <CardWrapper>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: "white",
                borderRadius: 15,
                height: "100%",
              }}
              variant="elevation"
              raised
            >
              <Image>
                <InsertPhotoOutlinedIcon
                  fontSize="large"
                  sx={{
                    width: 80,
                    height: 80,
                    color: "white",
                  }}
                />
              </Image>
              <Details>
                <Row>
                  <div>
                    <PermIdentityOutlinedIcon />
                  </div>
                  <div>{query.name}</div>
                </Row>
                <Row>
                  <div>
                    <CatchingPokemonTwoToneIcon />
                  </div>
                  <div>{query.type}</div>
                </Row>
                <Row>
                  <div>
                    <FeaturedPlayListOutlinedIcon />
                  </div>
                  <div>{query.set}</div>
                </Row>
                <Row>
                  <div>
                    <TagIcon />
                  </div>
                  <div>{query.year}</div>
                </Row>
              </Details>
              {/* <Button size="small" onClick={() => setEdit(!edit)}>
                  Edit
                </Button>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Edit"
                /> */}
            </Card>
          </CardWrapper>
        ))}
      </StyledPaper>
    </Container>
  )
}
