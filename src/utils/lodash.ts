const splitPoint = '.'

function isArrayString(str: string): boolean {
  const openBracketIndex = str.indexOf('[')
  const closeBracketIndex = str.indexOf(']')

  return openBracketIndex !== -1 && closeBracketIndex !== -1 && closeBracketIndex > openBracketIndex
}

function getKeyDetails(str: string): { keyName: string; idx: number } | undefined {
  const openBracketIndex = str.indexOf('[')
  const closeBracketIndex = str.indexOf(']')

  if (openBracketIndex === -1 || closeBracketIndex === -1) {
    return undefined
  }

  const keyName = str.slice(0, openBracketIndex).trim()
  const index = parseInt(str.slice(openBracketIndex + 1, closeBracketIndex).trim(), 10)

  if (isNaN(index)) return undefined

  return {
    keyName,
    idx: index
  }
}

function getValue(obj: any, pathArr: Array<string>): unknown {
  let key = pathArr[0]
  let index = -1

  const isArrayKey = isArrayString(key)

  if (isArrayKey) {
    const keyDetails = getKeyDetails(key)
    if (!keyDetails) return undefined
    key = keyDetails.keyName
    index = keyDetails.idx
  }

  const value = obj[key]

  if (value === undefined) return undefined

  if (isArrayKey && (index < 0 || index >= value.length)) {
    return undefined
  }

  if (pathArr.length === 1) {
    return isArrayKey ? value[index] : value
  }

  return isArrayKey ? getValue(value[index], pathArr.slice(1)) : getValue(value, pathArr.slice(1))
}

function setValue(obj: Record<string, unknown>, pathArr: Array<string>, valueToSet: unknown): void {
  let key = pathArr[0]
  let index = -1

  const isArrayKey = isArrayString(key)

  if (isArrayKey) {
    const keyDetails = getKeyDetails(key)
    if (!keyDetails) return
    key = keyDetails.keyName
    index = keyDetails.idx
  }

  if (isArrayKey && !Array.isArray(obj[key])) {
    obj[key] = []
  }

  if (pathArr.length === 1) {
    if (isArrayKey) {
      ;(obj[key] as Array<unknown>)[index] = valueToSet
    } else {
      obj[key] = valueToSet
    }
    return
  }

  if (isArrayKey) {
    if ((obj[key] as Array<unknown>)[index] === undefined) {
      ;(obj[key] as Array<unknown>)[index] = {}
    }
    setValue(
      (obj[key] as Array<unknown>)[index] as Record<string, unknown>,
      pathArr.slice(1),
      valueToSet
    )
  } else {
    if (typeof obj[key] !== 'object' || obj[key] === null) {
      obj[key] = {}
    }
    setValue(obj[key] as Record<string, unknown>, pathArr.slice(1), valueToSet)
  }
}

export function get(obj: unknown, path: string): unknown {
  if (!path) return undefined
  const pathArr = path.split(splitPoint)
  return getValue(obj, pathArr)
}

export function set(obj: Record<string, unknown>, path: string, valueToSet: unknown): void {
  if (!path) return
  const pathArr = path.split(splitPoint)
  setValue(obj, pathArr, valueToSet)
}
