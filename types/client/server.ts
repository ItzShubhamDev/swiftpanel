export interface ApiServer {
  object: 'server'
  attributes: {
    server_owner: string
    identifier: string
    uuid: string
    name: string
    node: number
    sftp_details: {
      ip: string
      port: number
    }
    description: string
    limits: {
      memory: number
      swap: number
      disk: number
      io: number
      cpu: number
    }
    feature_limits: {
      databases: number
      allocations: number
      backups: number
    }
    is_suspended: boolean
    is_installing: boolean
  }
}

export interface ApiServerStats {
  object: 'stats'
  attributes: {
    current_state: string
    is_suspended: boolean
    resources: {
      memory_bytes: number
      cpu_absolute: number
      disk_bytes: number
      network_rx_bytes: number
      network_tx_bytes: number
      uptime: number
    }
  }
}

export interface Server {
  id: string
  name: string
  status: string
  memory: string
  cpu: string
  storage: string
  uptime: string
}
