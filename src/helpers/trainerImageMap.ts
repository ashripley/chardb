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
import rock from "../assets/icons/types/psychic.png"
import steel from "../assets/icons/types/psychic.png"

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
