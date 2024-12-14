import vine from '@vinejs/vine'

export const locationValidator = vine.compile(
  vine
    .object({
      short: vine.string().trim().maxLength(60),
      long: vine.string().trim().maxLength(255).optional().nullable(),
    })
    .toCamelCase()
)
