import vine from '@vinejs/vine'

export const locationValidator = vine.compile(
  vine.object({
    long: vine.string().optional(),
    short: vine.string(),
  })
)
