import { Session } from '@adonisjs/session'

export function notifyError(session: Session, errors: any) {
  if (Array.isArray(errors)) {
    errors = errors.map((error: any) => error.message.replace('_', ' '))
  } else {
    errors = [errors]
  }
  session.flash('error', { errors })
}

export function notify(session: Session, message: string) {
  session.flash('alert', { type: 'success', message })
}

export async function getLatestVersion() {
  const res = await fetch('https://api.github.com/repos/itzshubhamdev/swiftpanel/releases/latest')
  if (!res.ok) {
    return 'Unknown'
  }
  const json = (await res.json()) as { tag_name: string }
  return json.tag_name
}
