import Server from '#models/server'

export default function serverTransformer(server: Server) {
  const res = {
    object: 'server',
    attributes: {
      server_owner: server.ownerId,
      identifier: server.uuidShort,
      uuid: server.uuid,
      name: server.name,
      node: server.nodeId,
      sftp_details: {
        ip: server.node.fqdn,
        port: server.node.daemonSftp,
      },
      description: server.description,
      limits: {
        memory: server.memory,
        swap: server.swap,
        disk: server.disk,
        io: server.io,
        cpu: server.cpu,
      },
      feature_limits: {
        databases: server.databaseLimit,
        allocations: server.allocationLimit,
        backups: server.backupLimit,
      },
      is_suspended: server.status === 'suspended',
      is_installing: server.status === 'installing',
    },
  }

  return res
}
