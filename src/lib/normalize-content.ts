type Primitive = string | number | boolean

const PRIMITIVE_CANDIDATE_KEYS = ['value', 'text', 'label', 'title', 'name']

const isPrimitive = (value: unknown): value is Primitive =>
  typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'

const tryExtractPrimitive = (obj: Record<string, unknown>, parentKey?: string): Primitive | undefined => {
  // Don't extract primitives from objects that have multiple keys (they're meant to be objects)
  const keys = Object.keys(obj)
  if (keys.length > 1) {
    return undefined
  }

  if (parentKey && parentKey in obj && isPrimitive(obj[parentKey])) {
    return obj[parentKey]
  }

  for (const key of PRIMITIVE_CANDIDATE_KEYS) {
    if (key in obj && isPrimitive(obj[key])) {
      // Only extract if this is the only key, or if it's a wrapper object
      if (keys.length === 1) {
        return obj[key]
      }
    }
  }

  if (keys.length === 1 && isPrimitive(obj[keys[0]])) {
    return obj[keys[0]] as Primitive
  }

  return undefined
}

export const normalizeContent = (value: unknown, parentKey?: string): unknown => {
  if (value === null || value === undefined) {
    return value
  }

  if (isPrimitive(value)) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(item => normalizeContent(item, parentKey))
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    const primitive = tryExtractPrimitive(obj, parentKey)
    if (primitive !== undefined) {
      return primitive
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, nestedValue]) => [key, normalizeContent(nestedValue, key)])
    )
  }

  return value
}
