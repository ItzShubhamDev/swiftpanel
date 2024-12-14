import type Allocation from '#models/allocation'

export function allocationTransformer(allocation: Allocation) {
  return {
    object: 'allocation',
    attributes: {
      id: allocation.id,
      ip: allocation.ip,
      alias: allocation.ipAlias,
      port: allocation.port,
      notes: allocation.notes,
      assigned: allocation.serverId !== null,
    },
  }
}
