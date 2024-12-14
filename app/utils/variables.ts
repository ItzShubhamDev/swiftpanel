export const STATUS_INSTALLING = 'installing'
export const STATUS_INSTALL_FAILED = 'install_failed'
export const STATUS_REINSTALL_FAILED = 'reinstall_failed'
export const STATUS_SUSPENDED = 'suspended'
export const STATUS_RESTORING_BACKUP = 'restoring_backup'

export const THRESHOLD_PERCENTAGE_LOW = 75
export const THRESHOLD_PERCENTAGE_MEDIUM = 90

export const reservedNames = [
  'SERVER_MEMORY',
  'SERVER_IP',
  'SERVER_PORT',
  'ENV',
  'HOME',
  'USER',
  'STARTUP',
  'SERVER_UUID',
  'UUID',
]

export const validationRules = [
  'after',
  'alpha',
  'alpha_dash',
  'alpha_num',
  'array',
  'before',
  'between',
  'boolean',
  'date',
  'date_format',
  'different',
  'email',
  'in',
  'integer',
  'max',
  'min',
  'not_in',
  'nullable',
  'numeric',
  'regex',
  'required',
  'same',
  'size',
  'string',
  'url',
]
