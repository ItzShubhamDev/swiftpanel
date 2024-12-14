import type Server from '#models/server'

export default function serverTransformer(server: Server) {
  const environment = {} as Record<string, string>
  server.serverVariables.map((v) => {
    const name = v.variable.envVariable
    environment[name] = v.variableValue
  })

  const res = {
    object: 'server',
    attributes: {
      id: server.id,
      external_id: server.externalId,
      uuid: server.uuid,
      identifier: server.uuidShort,
      name: server.name,
      description: server.description,
      suspended: server.status === 'suspended',
      limits: {
        memory: server.memory,
        swap: server.swap,
        disk: server.disk,
        io: server.io,
        cpu: server.cpu,
        threads: server.threads,
      },
      feature_limits: {
        databases: server.databaseLimit,
        allocations: server.allocationLimit,
        backups: server.backupLimit,
      },
      user: server.ownerId,
      node: server.nodeId,
      allocation: server.allocationId,
      nest: server.nestId,
      egg: server.eggId,
      container: {
        startup_command: server.startup,
        image: server.image,
        installed: server.installedAt !== null,
        environment,
      },
      updated_at: server.updatedAt,
      created_at: server.createdAt,
    },
  }

  return res
}
