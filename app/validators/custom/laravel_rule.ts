import exceptions from '#langs/en/exceptions'
import { validationRules } from '#utils/variables'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function laravelRule(value: unknown, _options: any, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  let isValid = true
  value.split('|').forEach((r) => {
    if (!validationRules.includes(r) && !r.includes(':')) {
      isValid = false
    } else if (r.includes(':')) {
      const [rule] = r.split(':')
      if (!validationRules.includes(rule)) {
        isValid = false
      }
    }
  })

  if (!isValid) {
    return field.report(
      exceptions.nest.variables.bad_validation_rule.replace(':rule', value),
      'bad_validation_rule',
      field
    )
  }
}

export const validateLaravelRule = vine.createRule(laravelRule)
