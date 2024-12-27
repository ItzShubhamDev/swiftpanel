import EggVariable from '#models/egg_variable'
import { LaravelRule } from '#validators/custom/laravel'
import vine from '@vinejs/vine'

export const renameValidator = vine.compile(
  vine.object({ name: vine.string(), description: vine.string().optional() })
)

export const updateValidator = vine.compile(vine.object({ docker_image: vine.string() }))

export const variableValidator = (variables: EggVariable[]) => {
  const rules = {} as Record<string, any>
  variables.forEach((variable) => {
    rules[variable.envVariable] = vine
      .string()
      .use(LaravelRule({ rules: variable.rules!, name: variable.name }))
  })
  return vine.compile(vine.object(rules))
}
