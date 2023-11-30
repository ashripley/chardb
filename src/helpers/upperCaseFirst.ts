export const upperCaseFirst = (str: string) => {
  if (typeof str !== "string") return
  return str.charAt(0).toUpperCase() + str.substring(1)
}
