type KeyValuePair<T> = {
  [key: string]: T
}

export default function findKeyByValue<T>(
  obj: KeyValuePair<T>,
  value: T
): string | null {
  const entry = Object.entries(obj).find(([, val]) => val === value)
  return entry ? entry[0] : null
}
