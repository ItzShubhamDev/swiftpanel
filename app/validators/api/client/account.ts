import vine from '@vinejs/vine'

export const emailChangeValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const passwordChangeValidator = vine.compile(
  vine.object({
    current_password: vine.string(),
    password: vine.string().minLength(8),
    password_confirmation: vine.string().sameAs('password'),
  })
)
