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

interface Props {
  query: Record<string, any>
}

const Container = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
`

const StyledPaper = styled(Paper)`
  background-color: cornsilk;
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
`

const CellContainer = styled.div`
  display: flex;
  max-width: 100%;
  width: "100%";
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

const CellWrapper = styled.div`
  padding: 10px 0px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const Label = styled.div`
  display: flex;
  max-width: 100%;
  width: 30%;
`

const Data = styled.div`
  display: flex;
  max-width: 100%;
  width: 60%;
`

export const PokemonCard = (props: Props) => {
  const [edit, setEdit] = useState(false)

  return (
    <Container>
      <StyledPaper
        // variant="elevation"
        elevation={0}
        style={{ backgroundColor: "cornsilk", maxWidth: "100%" }}
      >
        {props.query.map((query: Record<string, any>) => (
          <CardWrapper>
            <Card
              sx={{ minWidth: 275, backgroundColor: "floralwhite" }}
              variant="elevation"
              raised
            >
              <CardContent>
                <CellContainer>
                  <CellWrapper>
                    <Label>
                      <div>Name: </div>
                    </Label>
                    <Data>
                      <TextField
                        disabled={!edit}
                        size="small"
                        variant="standard"
                        value={query.name}
                      >
                        {query.name}
                      </TextField>
                    </Data>
                  </CellWrapper>
                  <CellWrapper>
                    <Label>
                      <div>Type: </div>
                    </Label>
                    <Data>
                      <TextField
                        disabled={!edit}
                        size="small"
                        variant="standard"
                        value={query.type}
                      >
                        {query.type}
                      </TextField>
                    </Data>
                  </CellWrapper>
                  <CellWrapper>
                    <Label>
                      <div>Set: </div>
                    </Label>
                    <Data>
                      <TextField
                        disabled={!edit}
                        size="small"
                        variant="standard"
                        value={query.set}
                      >
                        {query.set}
                      </TextField>
                    </Data>
                  </CellWrapper>
                  <CellWrapper>
                    <Label>
                      <div>Year: </div>
                    </Label>
                    <Data>
                      <TextField
                        disabled={!edit}
                        size="small"
                        variant="standard"
                        value={query.year}
                      >
                        {query.year}
                      </TextField>
                    </Data>
                  </CellWrapper>
                </CellContainer>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setEdit(!edit)}>
                  Edit
                </Button>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Edit"
                />
              </CardActions>
            </Card>
          </CardWrapper>
        ))}
      </StyledPaper>
    </Container>
  )
}
