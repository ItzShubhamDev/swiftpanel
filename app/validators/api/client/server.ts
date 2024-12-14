import vine from '@vinejs/vine'

export const renameValidator = vine.compile(
  vine.object({ name: vine.string(), description: vine.string().optional() })
)

export const updateValidator = vine.compile(vine.object({ docker_image: vine.string() }))
