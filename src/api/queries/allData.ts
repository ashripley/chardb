import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
import { AllPokemon } from "./allPokemon"
import { setAttributeData, setPokemonData } from "../../redux/root"
import { AllAttributes } from "./allAttributes"

export const AllDataQuery = async (dispatch: Dispatch<UnknownAction>) => {
  try {
    try {
      const pokemon = await AllPokemon()
      dispatch(setPokemonData(pokemon || []))
    } catch (e) {
      console.error("Error fetching pokemon: ", e)
    }

    try {
      const attributes = await AllAttributes()
      dispatch(setAttributeData(attributes || []))
    } catch (e) {
      console.error("Error fetching attributes: ", e)
    }

    // try {
    //   const cards = await AllCards()
    //   dispatch(setCardData(cards || []))
    // } catch (e) {
    //   console.error("Error fetching cards: ", e)
    // }
  } catch (error) {
    console.error("Error fetching data: ", error)
  }
}
