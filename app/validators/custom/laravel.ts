import vine from '@vinejs/vine'
import { Validator } from '@itzshubhamdev/laravel_js_validator'
import { FieldContext } from '@vinejs/vine/types'

type LaravelRuleOptions = {
  rules: string
  name: string
}

async function laravel(value: unknown, validation: LaravelRuleOptions, field: FieldContext) {
  if (typeof value !== 'string' || typeof validation.rules !== 'string') {
    return
  }

  const res = Validator.validate({ value }, { value: validation.rules })

  if (!res.success) {
    const errors = Object.values(res.errors)[0] as string[]
    const error = errors[0].replace('value', `${validation.name} variable`)
    field.report(error, validation.rules, field)
  }
}

export const LaravelRule = vine.createRule(laravel)
