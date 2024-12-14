import { JsonRule } from '#validators/custom/json'
import { validateLaravelRule } from '#validators/custom/laravel_rule'
import vine from '@vinejs/vine'

const egg = {
  name: vine.string().trim(),
  description: vine.string().trim().optional().nullable(),
  docker_images: vine.string().trim(),
  startup: vine.string().trim(),
  config_from: vine.number().positive().withoutDecimals().optional().nullable(),
  config_stop: vine.string().trim().optional().requiredIfMissing('config_from'),
  config_logs: vine.string().trim().optional().requiredIfMissing('config_from').use(JsonRule()),
  config_files: vine.string().trim().optional().requiredIfMissing('config_from').use(JsonRule()),
  config_startup: vine.string().trim().optional().requiredIfMissing('config_from').use(JsonRule()),
}

const eggVariables = {
  name: vine.string().trim(),
  description: vine
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((v) => v || ''),
  env_variable: vine.string().trim().toUpperCase(),
  default_value: vine
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((v) => v || ''),
  options: vine
    .array(vine.string().in(['user_viewable', 'user_editable']))
    .optional()
    .nullable(),
  rules: vine.string().trim().use(validateLaravelRule()),
}

const eggScripts = {
  copy_script_from: vine.number().positive().withoutDecimals().optional().nullable(),
  script_container: vine.string().trim(),
  script_entry: vine.string().trim(),
  script_install: vine.string().trim(),
}

export const updateValidator = vine.compile(vine.object(egg).toCamelCase())

export const createValidator = vine.compile(
  vine
    .object({
      nest_id: vine.number().positive().withoutDecimals(),
      ...egg,
    })
    .toCamelCase()
)

export const variableValidator = vine.compile(vine.object(eggVariables).toCamelCase())

export const scriptValidator = vine.compile(vine.object(eggScripts).toCamelCase())

export const importEggValidator = vine.compile(
  vine
    .object({
      _comment: vine.string(),
      meta: vine.object({
        version: vine.string(),
        update_url: vine.string().optional().nullable(),
      }),
      exported_at: vine.string(),
      name: vine.string().trim(),
      author: vine.string().trim(),
      description: vine.string().trim().optional().nullable(),
      features: vine.array(vine.string()).optional().nullable(),
      docker_images: vine.any().use(JsonRule()),
      file_denylist: vine.array(vine.string()).optional().nullable(),
      startup: vine.string().trim(),
      config: vine.object({
        files: vine.any().use(JsonRule()),
        startup: vine.any().use(JsonRule()),
        logs: vine.any().use(JsonRule()),
        stop: vine.string().trim(),
      }),
      scripts: vine.object({
        installation: vine.object({
          script: vine.string().trim(),
          container: vine.string().trim(),
          entrypoint: vine.string().trim(),
        }),
      }),
      variables: vine.array(
        vine.object({
          name: vine.string().trim(),
          description: vine.string().trim().optional().nullable(),
          env_variable: vine.string().trim().toUpperCase(),
          default_value: vine.string().trim().optional().nullable(),
          user_viewable: vine.boolean(),
          user_editable: vine.boolean(),
          rules: vine.string().trim().use(validateLaravelRule()),
          field_type: vine.string().trim(),
        })
      ),
    })
    .toCamelCase()
)

export const importEggFormValidator = vine.compile(
  vine.object({ import_file: vine.file() }).toCamelCase()
)
