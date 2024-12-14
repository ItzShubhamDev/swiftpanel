import vine from '@vinejs/vine'

export const newValidator = vine.compile(
  vine.object({
    allocations: vine.string(),
    database_hosts: vine.string(),
    eggs: vine.string(),
    locations: vine.string(),
    nests: vine.string(),
    nodes: vine.string(),
    server_databases: vine.string(),
    servers: vine.string(),
    users: vine.string(),
    description: vine.string(),
  })
)
