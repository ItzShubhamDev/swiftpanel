import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    username: vine.string(),
    name_first: vine.string(),
    name_last: vine.string(),
    root_admin: vine.boolean(),
    password: vine.string().minLength(8).nullable().optional(),
  })
)
