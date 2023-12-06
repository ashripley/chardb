export const upperCaseFirst = (str: string): string => {
  if (typeof str !== "string" || str.length === 0) {
    // Handle non-string input or empty string
    // You can throw an error, return an empty string or return the input itself
    return ""
  }
  return str.charAt(0).toUpperCase() + str.substring(1)
}
