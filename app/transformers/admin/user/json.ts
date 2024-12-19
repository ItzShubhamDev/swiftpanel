import User from '#models/user'
import { md5 } from '#utils/admin/user'

export default function UserJsonTransformer(user: User) {
  return {
    id: user.id,
    external_id: user.externalId,
    uuid: user.uuid,
    username: user.username,
    email: user.email,
    name_first: user.nameFirst,
    name_last: user.nameLast,
    language: user.language,
    root_admin: user.rootAdmin,
    use_totp: user.useTotp,
    gravatar: user.gravatar,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
    md5: md5(user.email),
  }
}
