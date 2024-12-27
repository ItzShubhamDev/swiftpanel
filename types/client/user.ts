export interface User {
  id: number
  external_id: number
  uuid: string
  username: string
  email: string
  name_first: string
  name_last: string
  remember_token: string
  language: string
  root_admin: boolean
  use_totp: boolean
  totp_secret: string
  totp_authenticated_at: string
  gravatar: number
  created_at: string
  updated_at: string
}
