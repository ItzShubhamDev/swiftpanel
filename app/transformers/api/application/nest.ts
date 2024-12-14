import type Nest from '#models/nest'

export default function nestTransformer(nest: Nest) {
  return {
    object: 'nest',
    attributes: {
      author: nest.author,
      created_at: nest.createdAt,
      description: nest.description,
      id: nest.id,
      name: nest.name,
      updated_at: nest.updatedAt,
      uuid: nest.uuid,
    },
  }
}
