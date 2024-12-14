import type EggVariable from '#models/egg_variable'
import vine from '@vinejs/vine'
import { LaravelRule } from '#validators/custom/laravel'

export const serverValidator = vine.compile(
  vine.object({
    name: vine.string(),
    user: vine.number().withoutDecimals().positive(),
    egg: vine.number().withoutDecimals().positive(),
    docker_image: vine.string(),
    startup: vine.string(),
    environment: vine.record(vine.string()),
    limits: vine.object({
      memory: vine.number().withoutDecimals().positive(),
      swap: vine.number().withoutDecimals(),
      disk: vine.number().withoutDecimals().positive(),
      io: vine.number().withoutDecimals().positive(),
      cpu: vine.number().withoutDecimals().positive(),
    }),
    feature_limits: vine.object({
      databases: vine.number().withoutDecimals().positive(),
      backups: vine.number().withoutDecimals().positive(),
    }),
    allocation: vine.object({
      default: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const variableValidator = (variables: EggVariable[]) => {
  const rules = {} as Record<string, any>
  variables.forEach((variable) => {
    rules[variable.envVariable] = vine
      .string()
      .use(LaravelRule({ rules: variable.rules!, name: variable.name }))
  })
  return vine.compile(vine.object(rules))
}

export const detailsValidator = vine.compile(
  vine.object({
    name: vine.string(),
    user: vine.number().withoutDecimals().positive(),
    external_id: vine.string().optional(),
    description: vine.string().optional(),
  })
)

export const buildValidator = vine.compile(
  vine.object({
    allocation: vine.number().withoutDecimals().positive(),
    memory: vine.number().withoutDecimals().positive().optional().requiredIfMissing('limits'),
    swap: vine.number().withoutDecimals().optional().optional().requiredIfMissing('limits'),
    io: vine.number().withoutDecimals().positive().optional().requiredIfMissing('limits'),
    cpu: vine.number().withoutDecimals().positive().optional().requiredIfMissing('limits'),
    disk: vine.number().withoutDecimals().positive().optional().requiredIfMissing('limits'),
    threads: vine.string().optional(),
    limits: vine
      .object({
        memory: vine.number().withoutDecimals().positive(),
        swap: vine.number().withoutDecimals(),
        disk: vine.number().withoutDecimals().positive(),
        io: vine.number().withoutDecimals().positive(),
        cpu: vine.number().withoutDecimals().positive(),
      })
      .optional(),
    feature_limits: vine.object({
      databases: vine.number().withoutDecimals().positive(),
      backups: vine.number().withoutDecimals().positive(),
      allocations: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const startupValidator = vine.compile(
  vine.object({
    startup: vine.string(),
    environment: vine.record(vine.string()).nullable(),
    egg: vine.number().withoutDecimals().positive(),
    image: vine.string(),
    skip_scripts: vine.boolean().optional(),
  })
)

export const databaseValidator = vine.compile(
  vine.object({
    database: vine.string(),
    remote: vine.string().optional().requiredIfExists('database'),
    host: vine.number().positive().withoutDecimals().optional().requiredIfExists('database'),
  })
)
