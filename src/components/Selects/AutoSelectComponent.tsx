import { Autocomplete, Paper, TextField } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { CardState, RootState } from "../../redux/store"
import { upperCaseFirst } from "../../helpers/upperCaseFirst"
import { sxColourMap } from "../../helpers/view"
import { theme } from "../../theme"

export const AutoSelectComponent = () => {
  const dispatch = useDispatch()
  const { isAddModalOpen } = useSelector((state: CardState) => state.card)
  const { dbType, setData, pokemonData } = useSelector(
    (state: RootState) => state.root
  )

  // styles
  const inputProps = {
    sx: {
      borderRadius: "15px !important",
      minWidth: 150,
      fieldset: {
        borderColor: theme.darkBg,
      },
      input: { color: theme.primaryText },

      "&:hover": {
        fieldset: {
          borderColor: `${theme[`${dbType}Accent`]} !important`,
        },
      },
    },
  }

  const paperStyles = {
    fontFamily: theme.fontFamily,
    backgroundColor: theme.lightBg,
    borderRadius: 15,
    overflow: "hidden",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    maxHeight: 300,
  }

  const sxStyles = {
    minWidth: 200,
    width: "100%",
    fieldset: {
      borderColor: theme.darkBg,
    },
    color: theme.primaryText,
    justifyContent: "center",

    "&:hover": {
      fieldset: {
        borderColor:
          (dbType === "char"
            ? theme.charAccent
            : dbType === "squir"
            ? theme.squirAccent
            : theme.bulbAccent) + "!important",
      },
    },

    "& > div > div": {
      borderRadius: "15px !important",
    },
  }

  return (
    <Autocomplete
      id="pokemon-name-autocomplete-select"
      options={pokemonData
        .map((pokemon) => upperCaseFirst(pokemon.name))
        .sort((a, b) => a.localeCompare(b))}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Pokemon"
          color={sxColourMap[dbType]}
          inputProps={{
            ...inputProps,
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
      PaperComponent={({ children }) => (
        <Paper style={paperStyles}>{children}</Paper>
      )}
      sx={sxStyles}
    />
  )
}