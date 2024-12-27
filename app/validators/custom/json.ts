import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function json(value: unknown, _options: any, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  try {
    JSON.parse(value)
  } catch (error) {
    field.report(`The value ${field.name} must be a valid JSON string.`, 'json', field)
  }
}

export const JsonRule = vine.createRule(json)
