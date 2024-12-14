import vine from '@vinejs/vine'

export const apiKeyValidator = vine.compile(
  vine.object({
    description: vine.string(),
    allowed_ips: vine.array(vine.string()).optional(),
  })
)
