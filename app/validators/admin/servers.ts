import vine from '@vinejs/vine'

const details = vine.object({
  name: vine.string(),
  owner_id: vine.number().positive().withoutDecimals(),
  description: vine
    .string()
    .optional()
    .nullable()
    .transform((value) => value ?? ''),
})

const build = vine.object({
  cpu: vine.number().withoutDecimals().min(0),
  threads: vine.string().optional().nullable(),
  memory: vine.number().withoutDecimals().min(0),
  swap: vine.number().withoutDecimals().min(-1),
  disk: vine.number().withoutDecimals().min(0),
  io: vine.number().withoutDecimals().min(10).max(1000),
  oom_disabled: vine.boolean().optional().nullable(),
  database_limit: vine.number().withoutDecimals().min(0),
  allocation_limit: vine.number().withoutDecimals().min(0),
  backup_limit: vine.number().withoutDecimals().min(0),
  allocation_id: vine.number().positive().withoutDecimals(),
})

const startup = vine.object({
  startup: vine.string(),
  nest_id: vine.number().positive().withoutDecimals(),
  egg_id: vine.number().positive().withoutDecimals(),
  skip_scripts: vine.boolean().optional().nullable(),
  image: vine.string().url({ protocols: [] }),
  custom_image: vine.string().url({ protocols: [] }).optional().nullable(),
  environment: vine.record(
    vine
      .string()
      .optional()
      .nullable()
      .transform((value) => value ?? '')
  ),
})

export const createServerValidator = vine.compile(
  vine.object({
    ...details.getProperties(),
    start_on_completion: vine.boolean().optional().nullable(),
    node_id: vine.number().positive().withoutDecimals(),
    allocation_additional: vine
      .array(vine.number().positive().withoutDecimals())
      .optional()
      .nullable(),
    ...build.getProperties(),
    ...startup.getProperties(),
  })
)

export const updateDetailsValidator = vine.compile(
  vine.object({
    ...details.getProperties(),
    external_id: vine.number().positive().withoutDecimals().optional().nullable(),
  })
)

export const updateBuildValidator = vine.compile(
  vine.object({
    ...build.getProperties(),
    add_allocations: vine.array(vine.number().positive().withoutDecimals()).optional(),
    remove_allocations: vine.array(vine.number().positive().withoutDecimals()).optional(),
  })
)

export const updateStartupValidator = vine.compile(startup)
