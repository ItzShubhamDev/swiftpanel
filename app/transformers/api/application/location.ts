import type Location from '#models/location'

export default function locationTransformer(location: Location) {
  const res = {
    object: 'location',
    attributes: {
      id: location.id,
      long: location.long,
      short: location.short,
      created_at: location.createdAt,
      updated_at: location.updatedAt,
    },
  }
  return res
}
