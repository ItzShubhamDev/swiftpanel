import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    external_id: vine.string().optional(),
    first_name: vine.string(),
    language: vine.string().optional(),
    last_name: vine.string(),
    password: vine.string().minLength(8).optional(),
    root_admin: vine.boolean().optional(),
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    external_id: vine.string().optional(),
    first_name: vine.string(),
    language: vine.string().optional(),
    last_name: vine.string(),
    password: vine.string().minLength(8).optional(),
    root_admin: vine.boolean().optional(),
    username: vine.string(),
  })
)
