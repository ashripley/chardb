export const omit = (key: any, obj: any) => {
  const { [key]: omitted, ...rest } = obj
  return rest
}
