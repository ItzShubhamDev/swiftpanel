import type Database from '#models/database'

export default function databaseTransformer(database: Database) {
  const res = {
    object: 'server_database',
    attributes: {
      id: database.id,
      server: database.serverId,
      host: database.host,
      database: database.database,
      username: database.username,
      remote: database.remote,
      max_connections: database.maxConnections,
      created_at: database.createdAt,
      updated_at: database.updatedAt,
    },
  }

  return res
}
