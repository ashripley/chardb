import setIcon from "../assets/icons/set.png"
import pokemonNameIcon from "../assets/icons/pokemonName.png"
import pokemonTypeIcon from "../assets/icons/pokemonType.png"
import yearIcon from "../assets/icons/year.png"
import attributeIcon from "../assets/icons/attribute.png"
import setNumberIcon from "../assets/icons/setNumber.png"
import idIcon from "../assets/icons/id.png"
import quantityIcon from "../assets/icons/quantity.png"
import { IconImageMap } from "../components/IconImageMap"

export const fieldsToMap = (
  isEditView: boolean,
  fields: Record<string, any>,
  isAddModal: boolean,
  pokemon?: Record<string, any>,
  omitId?: boolean
) => {
  const icons = {
    id: idIcon,
    name: pokemonNameIcon,
    type: pokemonTypeIcon,
    set: setIcon,
    setNumber: setNumberIcon,
    year: yearIcon,
    attribute: attributeIcon,
    quantity: quantityIcon,
  }

  return {
    ...(omitId &&
      !isEditView &&
      !isAddModal && {
        id: {
          label: "Id",
          value: pokemon?.id,
          icon: IconImageMap(icons.id, false),
        },
      }),
    name: {
      label: "Name",
      value: fields.name,
      icon: IconImageMap(icons.name, false),
    },
    type: {
      label: "Type",
      value: fields.type,
      icon: IconImageMap(icons.type, false),
    },
    set: {
      label: "Set",
      value: fields.set,
      icon: IconImageMap(icons.set, false),
    },
    setNumber: {
      label: "Set Number",
      value: fields.setNumber,
      icon: IconImageMap(icons.setNumber, false),
    },
    year: {
      label: "Year",
      value: fields.year,
      icon: IconImageMap(icons.year, false),
    },
    ...((isEditView || isAddModal) && {
      quantity: {
        label: "Quantity",
        value: fields.quantity,
        icon: IconImageMap(icons.quantity, false),
      },
    }),
    attribute: {
      label: "Attribute",
      value: pokemon?.attribute,
      icon: IconImageMap(icons.attribute, false),
    },
  }
}
