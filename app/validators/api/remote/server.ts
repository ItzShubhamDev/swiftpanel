import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
  vine.object({
    data: vine.array(
      vine.object({
        server: vine.string().uuid(),
        action: vine.string(),
        timestamp: vine.date({ formats: ['iso8601'] }),
        metadate: vine.record(vine.any()),
        ip: vine.string().ipAddress(),
        user: vine.string().uuid(),
      })
    ),
  })
)
