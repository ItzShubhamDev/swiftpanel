import jwt from 'jsonwebtoken'
import { appUrl } from '#config/app'
import type Node from '#models/node'
import { decrypt, randomString } from '#utils/index'
import crypto from 'node:crypto'
import Server from '#models/server'

const defaultOptions: jwt.SignOptions = {
  algorithm: 'HS256',
  issuer: appUrl,
  notBefore: '-5m',
}

export async function signToken(
  node: Node,
  expiresIn: string,
  claims: Record<string, any> = {},
  identifiedBy: string,
  algo: string = 'md5'
) {
  const options: jwt.SignOptions = {
    ...defaultOptions,
    audience: node.fqdn,
    expiresIn,
    jwtid: crypto.hash(algo, identifiedBy),
  }

  const data = { ...claims, unique_id: randomString(16) }

  const secret = decrypt(node.daemonToken)
  const token = jwt.sign(data, secret, options)

  return token
}

export async function handle(
  server: Server,
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: object | string | null = null,
  Accept: string | null = 'application/json'
): Promise<Response> {
  const url = `${server.node.scheme}://${server.node.fqdn}:${server.node.daemonListen}${endpoint}`
  const token = decrypt(server.node.daemonToken)
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': typeof body === 'string' ? 'text/plain' : 'application/json',
  } as Record<string, string>

  if (Accept) {
    headers.Accept = Accept
  }

  const options: RequestInit = {
    method,
    headers,
    body: typeof body === 'string' ? body : body ? JSON.stringify(body) : undefined,
  }

  return fetch(url, options)
}
