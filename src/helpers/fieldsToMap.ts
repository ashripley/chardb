import set from "../assets/icons/set.png"
import pokemonName from "../assets/icons/pokemonName.png"
import pokemonType from "../assets/icons/pokemonType.png"
import year from "../assets/icons/year.png"
import attribute from "../assets/icons/attribute.png"
import setNumber from "../assets/icons/setNumber.png"
import id from "../assets/icons/id.png"
import quantity from "../assets/icons/quantity.png"
import { IconImageMap } from "../components/IconImageMap"

export const fieldsToMap = (
  isEditView: boolean,
  fields: Record<string, any>,
  isAddModal: boolean,
  pokemon?: Record<string, any>
) => {
  return {
    ...(!isEditView &&
      !isAddModal && {
        id: { label: "Id", value: pokemon?.id, icon: IconImageMap(id) },
      }),
    name: {
      label: "Name",
      value: fields.name,
      icon: IconImageMap(pokemonName),
    },
    type: {
      label: "Type",
      value: fields.type,
      icon: IconImageMap(pokemonType),
    },
    set: { label: "Set", value: fields.set, icon: IconImageMap(set) },
    setNumber: {
      label: "Set Number",
      value: fields.setNumber,
      icon: IconImageMap(setNumber),
    },
    year: { label: "Year", value: fields.year, icon: IconImageMap(year) },
    ...(!isEditView &&
      !isAddModal && {
        attribute: {
          label: "Attribute",
          value: pokemon?.attribute,
          icon: IconImageMap(attribute),
        },
      }),
    ...((isEditView || isAddModal) && {
      quantity: {
        label: "Quantity",
        value: fields.quantity,
        icon: IconImageMap(quantity),
      },
    }),
  }
}
