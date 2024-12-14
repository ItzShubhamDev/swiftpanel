import User from '#models/user'

export default function userTransformer(user: User) {
  return {
    object: 'user',
    attributes: {
      id: user.id,
      admin: user.rootAdmin,
      username: user.username,
      email: user.email,
      first_name: user.nameFirst,
      last_name: user.nameLast,
      language: user.language,
    },
  }
}
