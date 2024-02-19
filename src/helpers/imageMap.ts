import dark from "../assets/icons/types/dark.png"
import water from "../assets/icons/types/water.png"
import ice from "../assets/icons/types/ice.png"
import fire from "../assets/icons/types/fire.png"
import dragon from "../assets/icons/types/dragon.png"
import grass from "../assets/icons/types/grass.png"
import electric from "../assets/icons/types/electric.png"
import fairy from "../assets/icons/types/fairy.png"
import fighting from "../assets/icons/types/fighting.png"
import ground from "../assets/icons/types/ground.png"
import normal from "../assets/icons/types/normal.png"
import poison from "../assets/icons/types/poison.png"
import psychic from "../assets/icons/types/psychic.png"
import rock from "../assets/icons/types/rock.png"
import steel from "../assets/icons/types/steel.png"

import { IoIosStar as rare } from "react-icons/io"
import { FaCircle as common } from "react-icons/fa"
import { FaDiamond as uncommon } from "react-icons/fa6"
import { TbStarsFilled as hyperRare } from "react-icons/tb"
import { TbStars as superRare } from "react-icons/tb"
import { BsStars as special } from "react-icons/bs"

export const energyImageMap = (type: string): string => {
  const icons: Record<string, any> = {
    water,
    ice,
    fire,
    dragon,
    dark,
    grass,
    electric,
    fairy,
    fighting,
    ground,
    normal,
    poison,
    psychic,
    rock,
    steel,
  }

  return icons[type]
}

export const rarityImageMap: Record<string, any> = {
  common,
  rare,
  uncommon,
  "hyper rare": hyperRare,
  "super rare": superRare,
  special,
}
