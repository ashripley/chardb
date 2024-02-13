import { Button, CircularProgress, TextField } from "@mui/material"
import styled from "styled-components"
import * as React from "react"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { theme } from "../../theme"
import { RootState } from "../../redux/store"
import { AllSets } from "../../api/queries/allSets"
import { setSetData, setTypeData } from "../../redux/root"
import { AddSetMutation } from "../../api/mutations/addSet"
import { sxColourMap } from "../../helpers/view"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { AllTypes } from "../../api/queries/allTypes"
import { AddTypeMutation } from "../../api/mutations/addType"

const Header = styled.div`
  font-size: 1.5rem;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 0;
  font-family: ${theme.fontFamily};
  min-height: 50px;
  padding: 15px;
  width: auto;
}
`

const Details = styled.div`
  align-items: center;
  height: 90%;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`

const Row = styled.div`
  height: auto;
  display: flex;
  gap: 10px;
  min-height: 30px;
  width: auto;
  min-width: 400px;
`

const Data = styled.div`
  display: flex;
  font-weight: 800;
  justify-content: center;
  align-items: center;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  min-height: 30px;
  width: auto;
  min-width: 400px;
}
`

const StyledBox = styled(Box)`
  overflow: auto;
  max-height: 80%;
  padding: 20px;
`

const saveButton = {
  width: "auto",
  minWidth: "100px",
  minHeight: "40px",
  height: "auto",
}

const inputProps = {
  sx: {
    borderRadius: "10px !important",
    minWidth: 150,
    fieldset: {
      borderColor: theme.darkBg,
    },
    input: { color: theme.primaryText },

    "&:hover": {
      fieldset: {
        borderColor: `${theme.charAccent} !important`,
      },
    },
  },
}
export const Types = () => {
  const [name, setName] = useState("")
  const [colour, setColour] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchLoading, setIsFetchLoading] = useState(false)

  const dispatch = useDispatch()
  const { typeData } = useSelector((state: RootState) => state.root)

  const fetchTypes = async () => {
    setIsFetchLoading(true)
    try {
      const types = await AllTypes()

      dispatch(setTypeData(types || []))
      setIsFetchLoading(false)
    } catch (error) {
      console.error("set error: ", error)
    }
  }
  useEffect(() => {
    fetchTypes()
  }, [])

  const onSave = async () => {
    setIsLoading(true)

    await AddTypeMutation(name?.toLowerCase() ?? "", colour ?? "")

    setTimeout(() => {
      setIsLoading(false)
      clearFields()
      fetchTypes()
    }, 1500)
  }

  const clearFields = () => {
    setName("")
    setColour("")
  }

  return (
    <StyledBox>
      <Header>
        {"Add Type"}
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={onSave}
            sx={saveButton}
            disabled={(!name && !colour) || isLoading}
          >
            Save
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.bulbAccent,
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Header>
      <Details>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={name}
              label="Name"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </Data>
        </Row>
        <Row>
          <Data>
            <TextField
              id="standard"
              value={colour}
              placeholder="#"
              label="Hex Colour (#)"
              variant="outlined"
              color={sxColourMap["char"]}
              style={{ width: "100%", margin: 5 }}
              InputProps={inputProps}
              onChange={(e) => {
                setColour(e.target.value)
              }}
            />
          </Data>
        </Row>
      </Details>

      <Header>Current Types</Header>
      {isFetchLoading ? (
        <CircularProgress
          size={24}
          sx={{
            color: theme.charAccent,
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      ) : (
        <Details>
          {typeData.map((type, index) => (
            <Row key={index}>
              <Data>
                <TextField
                  id="standard"
                  value={upperCaseFirst(type.name)}
                  variant="outlined"
                  color={sxColourMap["char"]}
                  style={{ width: "100%", margin: 5 }}
                  InputProps={inputProps}
                />
              </Data>
              <Data>
                <TextField
                  id="standard"
                  value={"#" + type.colour}
                  variant="outlined"
                  color={sxColourMap["char"]}
                  style={{ width: "100%", margin: 5 }}
                  InputProps={inputProps}
                />
              </Data>
            </Row>
          ))}
        </Details>
      )}
    </StyledBox>
  )
}
