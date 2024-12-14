import { AccessToken } from '@adonisjs/auth/access_tokens'

export default function apiKeyTransformer(apiKey: AccessToken) {
  return {
    object: 'api_key',
    attributes: {
      identifier: apiKey.identifier,
      description: apiKey.name,
      allowed_ips: [],
      last_used_at: apiKey.lastUsedAt,
      created_at: apiKey.createdAt,
    },
  }
}
