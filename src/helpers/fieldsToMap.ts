import attributeIcon from "../assets/icons/attribute.png"
import idIcon from "../assets/icons/id.png"
import pokemonNameIcon from "../assets/icons/pokemonName.png"
import pokemonTypeIcon from "../assets/icons/pokemonType.png"
import quantityIcon from "../assets/icons/quantity.png"
import setIcon from "../assets/icons/set.png"
import setNumberIcon from "../assets/icons/setNumber.png"
import yearIcon from "../assets/icons/year.png"
import { IconImageMap } from "../components/IconImageMap"

export const icons: Record<string, any> = {
  id: idIcon,
  name: pokemonNameIcon,
  type: pokemonTypeIcon,
  set: setIcon,
  setNumber: setNumberIcon,
  year: yearIcon,
  attribute: attributeIcon,
  quantity: quantityIcon,
}

export const fieldsToMap = (
  isEditView: boolean,
  fields: Record<string, any>,
  isAddModal: boolean,
  pokemon?: Record<string, any>,
  omitId?: boolean,
  isTileView?: boolean
) => {
  return {
    ...(omitId &&
      !isEditView &&
      !isAddModal && {
        id: {
          label: "Id",
          value: pokemon?.id,
          icon: IconImageMap(icons.id, isTileView ?? false),
        },
      }),
    name: {
      label: "Name",
      value: fields.name,
      icon: IconImageMap(icons.name, isTileView ?? false),
    },
    type: {
      label: "Type",
      value: fields.type,
      icon: IconImageMap(icons.type, isTileView ?? false),
    },
    set: {
      label: "Set",
      value: fields.set,
      icon: IconImageMap(icons.set, isTileView ?? false),
    },
    setNumber: {
      label: "Set Number",
      value: fields.setNumber,
      icon: IconImageMap(icons.setNumber, isTileView ?? false),
    },
    year: {
      label: "Year",
      value: fields.year,
      icon: IconImageMap(icons.year, isTileView ?? false),
    },
    ...((isEditView || isAddModal) && {
      quantity: {
        label: "Quantity",
        value: fields.quantity,
        icon: IconImageMap(icons.quantity, isTileView ?? false),
      },
    }),
    attribute: {
      label: "Attribute",
      value: pokemon?.attribute,
      icon: IconImageMap(icons.attribute, isTileView ?? false),
    },
  }
}
