export interface Server {
  state: string
  is_suspended: boolean
  utilization: {
    memory_bytes: number
    memory_limit_bytes: number
    cpu_absolute: number
    network: {
      rx_bytes: number
      tx_bytes: number
    }
    uptime: number
    state: string
    disk_bytes: number
  }
  configuration: {
    uuid: string
    meta: {
      name: string
      description: string
    }
    suspended: boolean
    invocation: string
    skip_egg_scripts: boolean
    environment: Record<string, string>
    labels: Record<string, string>
    allocations: {
      force_outgoing_ip: string
      default: {
        ip: string
        port: number
      }
      mappings: Record<string, any>
    }
    build: {
      memory_limit: number
      swap: number
      io_weight: number
      cpu_limit: number
      disk_space: number
      threads: number
      oom_disabled: boolean
    }
    crash_detection_enabled: boolean
    mounts: any[]
    egg: {
      id: number
      file_denylist: any[]
    }
    container: {
      image: string
    }
  }
}
