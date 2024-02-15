import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  setAttributeData,
  setPokemonData,
  setRarityData,
  setSetData,
  setTypeData,
} from "../redux/root"
import { AllSets } from "../api/queries/allSets"
import { AllPokemon } from "../api/queries/allPokemon"
import { AllTypes } from "../api/queries/allTypes"
import { AllAttributes } from "../api/queries/allAttributes"
import { AllRarities } from "../api/queries/allRarities"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"

export const DataFetcher = async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const sets = await AllSets()
    dispatch(setSetData(sets || []))

    const pokemon = await AllPokemon()
    dispatch(setPokemonData(pokemon || []))

    const types = await AllTypes()
    dispatch(setTypeData(types || []))

    const attributes = await AllAttributes()
    dispatch(setAttributeData(attributes || []))

    const rarities = await AllRarities()
    dispatch(setRarityData(rarities || []))
  } catch (error) {
    console.error("Error fetching data: ", error)
  }
}
