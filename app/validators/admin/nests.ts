import vine from '@vinejs/vine'

export const nestValidator = vine.compile(
  vine
    .object({
      name: vine.string().trim(),
      description: vine.string().trim().optional().nullable(),
    })
    .toCamelCase()
)

export const importEggFormValidator = vine.compile(
  vine
    .object({
      import_file: vine.file(),
      import_to_nest: vine.number().positive().withoutDecimals(),
    })
    .toCamelCase()
)
