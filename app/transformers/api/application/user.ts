import type User from '#models/user'

export default function userTransformer(user: User) {
  const res = {
    object: 'user',
    attributes: {
      'id': user.id,
      'external_id': user.externalId,
      'uuid': user.uuid,
      'username': user.username,
      'email': user.email,
      'first_name': user.nameFirst,
      'last_name': user.nameLast,
      'language': user.language,
      'root_admin': user.rootAdmin,
      '2fa': false,
      'created_at': user.createdAt,
      'updated_at': user.updatedAt,
    },
  }
  return res
}
