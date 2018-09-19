export const types = {
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  TEXT: 'TEXT',
  NUMERIC: 'NUMERIC',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON'
}

function toDatabaseValue(columnMapping, resource) {
  return Object.entries(resource).reduce((o, p) => {
    o[p[0]] = propertyToDatabaseValue(columnMapping[p[0]].type, p[1])
    return o
  }, {})
}

function propertyToDatabaseValue(type, value) {
  switch (type) {
    case types.JSON:
      return JSON.stringify(value)
    default:
      return value
  }
}

function toModelValue(columnMapping, obj) {
  return Object.entries(obj).reduce((o, p) => {
    o[p[0]] = propertyToModelValue(columnMapping[p[0]].type, p[1])
    return o
  }, {})
}

function propertyToModelValue(type, value) {
  switch (type) {
    case types.JSON:
      return JSON.parse(value)
    default:
      return value
  }
}

export default {
  toDatabaseValue,
  propertyToDatabaseValue,
  toModelValue,
  propertyToModelValue
}
