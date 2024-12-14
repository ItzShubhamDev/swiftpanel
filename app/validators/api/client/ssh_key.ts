import vine from '@vinejs/vine'

export const sshKeyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    public_key: vine.string(),
  })
)

export const sshKeyDeleteValidator = vine.compile(
  vine.object({
    fingerprint: vine.string(),
  })
)
