import vine from '@vinejs/vine'

export const nodeValidator = vine.compile(
  vine.object({
    behind_proxy: vine.boolean().optional(),
    daemon_base: vine.string().optional(),
    daemon_listen: vine.number().positive().withoutDecimals(),
    daemon_sftp: vine.number().positive().withoutDecimals(),
    description: vine.string().optional(),
    disk: vine.number().positive().withoutDecimals(),
    disk_overallocate: vine.number().withoutDecimals(),
    fqdn: vine.string(),
    location_id: vine.number().positive().withoutDecimals(),
    maintenance_mode: vine.boolean().optional(),
    memory: vine.number().positive().withoutDecimals(),
    memory_overallocate: vine.number().withoutDecimals(),
    name: vine.string(),
    public: vine.boolean().optional(),
    scheme: vine.string(),
    upload_size: vine.number().optional(),
  })
)

export const allocationValidator = vine.compile(
  vine.object({
    ip: vine.string().ipAddress(),
    ip_alias: vine.string().optional(),
    port: vine.number().positive().withoutDecimals(),
  })
)
