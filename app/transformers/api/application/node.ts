import type Node from '#models/node'

export default function nodeTransformer(node: Node) {
  const res = {
    object: 'node',
    attributes: {
      id: node.id,
      uuid: node.uuid,
      public: node.public,
      name: node.name,
      description: node.description,
      location_id: node.locationId,
      fqdn: node.fqdn,
      scheme: node.scheme,
      behind_proxy: node.behindProxy,
      maintenance_mode: node.maintenanceMode,
      memory: node.memory,
      memory_overallocate: node.memoryOverallocate,
      disk: node.disk,
      disk_overallocate: node.diskOverallocate,
      upload_size: node.uploadSize,
      daemon_listen: node.daemonListen,
      daemon_sftp: node.daemonSftp,
      daemon_base: node.daemonBase,
      created_at: node.createdAt,
      updated_at: node.updatedAt,
    },
  }
  return res
}
