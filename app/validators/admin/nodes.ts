import vine from '@vinejs/vine'

const node = {
  name: vine.string(),
  description: vine.string().optional().nullable(),
  location_id: vine.number().withoutDecimals().positive(),
  public: vine.boolean(),
  fqdn: vine.string(),
  scheme: vine.string().in(['http', 'https']),
  behind_proxy: vine.boolean(),
  memory: vine.number().withoutDecimals().positive(),
  memory_overallocate: vine.number().withoutDecimals().positive(),
  disk: vine.number().withoutDecimals().positive(),
  disk_overallocate: vine.number().withoutDecimals().positive(),
  daemonListen: vine.number().withoutDecimals().positive().min(1024).max(65535),
  daemonSftp: vine.number().withoutDecimals().positive().min(1024).max(65535),
}

export const updateNodeValidator = vine.compile(
  vine.object({
    maintenance_mode: vine.boolean(),
    reset_secret: vine.boolean().optional(),
    upload_size: vine.number().withoutDecimals().positive(),
    ...node,
  })
)

export const createNodeValidator = vine.compile(vine.object(node))

export const removeBlockValidator = vine.compile(vine.object({ ip: vine.string().ipAddress() }))

export const deleteAllocationsValidator = vine.compile(
  vine.object({
    allocations: vine.array(vine.object({ id: vine.number().positive().withoutDecimals() })),
  })
)

export const createAllocationValidator = vine.compile(
  vine.object({
    allocation_ip: vine.string().ipAddress(),
    allocation_alias: vine
      .string()
      .url({ require_protocol: false, protocols: [] })
      .optional()
      .nullable(),
    allocation_ports: vine.array(
      vine.unionOfTypes([
        vine.number().withoutDecimals().positive().min(1024).max(65535),
        vine.string().regex(/^(\d{4,5})-(\d{4,5})$/),
      ])
    ),
  })
)

export const aliasValidator = vine.compile(
  vine.object({
    alias: vine.string().url({
      protocols: [],
    }),
    allocation_id: vine.number().positive().withoutDecimals(),
  })
)
