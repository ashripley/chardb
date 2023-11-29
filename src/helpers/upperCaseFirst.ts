export const upperCaseFirst = (str: string) => {
  console.log("str", str)
  if (typeof str !== "string") return
  return str.charAt(0).toUpperCase() + str.substring(1)
}
